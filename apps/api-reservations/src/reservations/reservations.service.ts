import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ApproveReservationDto } from './dto/approve-reservation.dto';
import { ClientKafka } from '@nestjs/microservices';

type JwtUser = {
  sub: number | string; // puede venir como string desde JWT
  email: string;
  role: string; // STUDENT | TECH | ADMIN
  name?: string;
};

@Injectable()
export class ReservationsService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('KAFKA_RESERVATIONS') private readonly kafka: ClientKafka,
  ) {}

  async onModuleInit() {
    await this.kafka.connect();
  }

  // =========================
  // HELPERS
  // =========================
  private ensureStudent(user: JwtUser) {
    if (user.role !== 'STUDENT') {
      throw new ForbiddenException('Only students can create reservations');
    }
  }

  private toDate(value: string) {
    const d = new Date(value);
    if (isNaN(d.getTime())) {
      throw new BadRequestException('Invalid date format');
    }
    return d;
  }

  private overlaps(aStart: Date, aEnd: Date, bStart: Date, bEnd: Date) {
    return aStart < bEnd && bStart < aEnd;
  }

  // =========================
  // CREATE RESERVATION
  // =========================
  async createReservation(user: JwtUser, dto: CreateReservationDto) {
    this.ensureStudent(user);

    const startAt = this.toDate(dto.startAt);
    const endAt = this.toDate(dto.endAt);

    if (startAt >= endAt) {
      throw new BadRequestException('startAt must be before endAt');
    }

    // ✅ Convertimos studentId a número para Prisma
    const studentId = Number(user.sub);
    if (isNaN(studentId)) {
      throw new BadRequestException('Invalid student ID');
    }
    const studentEmail = user.email;
    const studentName = user.name ?? null;

    const equipment = await this.prisma.equipmentSnapshot.findUnique({
      where: { equipmentId: dto.equipmentId },
    });

    if (!equipment) {
      throw new NotFoundException('Equipment not found in inventory');
    }

    if (equipment.status !== 'AVAILABLE') {
      throw new BadRequestException('Equipment not available');
    }

    const activeReservations = await this.prisma.reservation.findMany({
      where: {
        equipmentId: dto.equipmentId,
        status: { in: ['PENDING', 'APPROVED'] },
      },
    });

    const hasConflict = activeReservations.some(r =>
      this.overlaps(startAt, endAt, r.startAt, r.endAt),
    );

    if (hasConflict) {
      throw new BadRequestException(
        'Equipment already reserved in that time range',
      );
    }

    const reservation = await this.prisma.reservation.create({
      data: {
        equipmentId: dto.equipmentId,
        studentId, // ahora seguro es Int
        studentEmail,
        studentName,
        startAt,
        endAt,
        reason: dto.reason,
        status: 'PENDING',
      },
    });

    await this.kafka.emit('reservation.events', {
      type: 'RESERVATION_CREATED',
      reservationId: reservation.id,
      equipmentId: reservation.equipmentId,
      equipmentName: equipment.name,
      studentId: reservation.studentId,
      studentEmail: reservation.studentEmail,
      studentName: reservation.studentName,
      startAt: reservation.startAt.toISOString(),
      endAt: reservation.endAt.toISOString(),
      at: new Date().toISOString(),
    });

    return reservation;
  }

  // =========================
  // APPROVE RESERVATION
  // =========================
  async approveReservation(
    user: JwtUser,
    id: number,
    dto: ApproveReservationDto,
  ) {
    if (!['TECH', 'ADMIN'].includes(user.role)) {
      throw new ForbiddenException(
        'Only tech or admin can approve reservations',
      );
    }

    const reservation = await this.prisma.reservation.findUnique({ where: { id } });

    if (!reservation) throw new NotFoundException('Reservation not found');

    if (reservation.status !== 'PENDING')
      throw new BadRequestException('Reservation is not pending');

    const approved = await this.prisma.reservation.findMany({
      where: {
        equipmentId: reservation.equipmentId,
        status: 'APPROVED',
        NOT: { id: reservation.id },
      },
    });

    const conflict = approved.some(r =>
      this.overlaps(reservation.startAt, reservation.endAt, r.startAt, r.endAt),
    );

    if (conflict)
      throw new BadRequestException('Conflict with another approved reservation');

    const updated = await this.prisma.reservation.update({
      where: { id },
      data: { status: 'APPROVED', technicianName: dto.technicianName },
    });

    await this.kafka.emit('reservation.events', {
      type: 'RESERVATION_APPROVED',
      reservationId: updated.id,
      equipmentId: updated.equipmentId,
      technicianName: updated.technicianName,
      at: new Date().toISOString(),
    });

    return updated;
  }

  // =========================
  // CANCEL RESERVATION
  // =========================
  async cancelReservation(user: JwtUser, id: number) {
    const reservation = await this.prisma.reservation.findUnique({ where: { id } });

    if (!reservation) throw new NotFoundException('Reservation not found');

    const isOwner = reservation.studentId === Number(user.sub);

    if (!isOwner && user.role !== 'ADMIN') {
      throw new ForbiddenException('Not allowed to cancel this reservation');
    }

    if (['CANCELLED', 'REJECTED', 'FULFILLED'].includes(reservation.status)) {
      throw new BadRequestException('Reservation cannot be cancelled');
    }

    const updated = await this.prisma.reservation.update({
      where: { id },
      data: { status: 'CANCELLED' },
    });

    await this.kafka.emit('reservation.events', {
      type: 'RESERVATION_CANCELLED',
      reservationId: updated.id,
      equipmentId: updated.equipmentId,
      at: new Date().toISOString(),
    });

    return updated;
  }

  // =========================
  // LISTS
  // =========================
  listByStudent(user: JwtUser) {
    return this.prisma.reservation.findMany({
      where: { studentId: Number(user.sub) },
      orderBy: { createdAt: 'desc' },
    });
  }

  listAll() {
    return this.prisma.reservation.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}
