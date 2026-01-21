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
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

type JwtUser = {
  sub: number;
  email: string;
  role: string;     // STUDENT | TECH | ADMIN
  name?: string;
};

@Injectable()
export class ReservationsService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('KAFKA_RESERVATIONS') private readonly kafka: ClientKafka,
    private readonly http: HttpService,
  ) {}

  async onModuleInit() {
    await this.kafka.connect();
  }

  private ensureStudent(user: JwtUser) {
    if (user.role !== 'STUDENT') throw new ForbiddenException('Only students can create reservations');
  }

  private toDate(s: string) {
    const d = new Date(s);
    if (isNaN(d.getTime())) throw new BadRequestException('Invalid date format');
    return d;
  }

  private overlaps(aStart: Date, aEnd: Date, bStart: Date, bEnd: Date) {
    return aStart < bEnd && bStart < aEnd;
  }

  private async inventoryExists(equipmentId: number) {
    const base = process.env.INVENTORY_BASE_URL || 'http://api-inventory:3002';
    try {
      const res = await firstValueFrom(this.http.get(`${base}/api/v1/equipment/${equipmentId}`));
      return res.data;
    } catch {
      throw new NotFoundException('Equipment not found in inventory');
    }
  }

  async createReservation(user: JwtUser, dto: CreateReservationDto) {
    this.ensureStudent(user);

    const startAt = this.toDate(dto.startAt);
    const endAt = this.toDate(dto.endAt);
    if (startAt >= endAt) throw new BadRequestException('startAt must be < endAt');

    const equipment = await this.inventoryExists(dto.equipmentId);

    const active = await this.prisma.reservation.findMany({
      where: {
        equipmentId: dto.equipmentId,
        status: { in: ['PENDING', 'APPROVED'] },
      },
    });

    const conflict = active.some(r => this.overlaps(startAt, endAt, r.startAt, r.endAt));
    if (conflict) throw new BadRequestException('Equipment already reserved in that time range');

    const created = await this.prisma.reservation.create({
      data: {
        equipmentId: dto.equipmentId,
        studentId: user.sub,
        studentEmail: user.email,
        studentName: user.name ?? null,
        startAt,
        endAt,
        reason: dto.reason,
        status: 'PENDING',
      },
    });

    await this.kafka.emit('reservation.events', {
      type: 'RESERVATION_CREATED',
      reservationId: created.id,
      equipmentId: created.equipmentId,
      equipmentName: equipment?.name ?? null,
      studentId: created.studentId,
      studentEmail: created.studentEmail,
      studentName: created.studentName,
      startAt: created.startAt.toISOString(),
      endAt: created.endAt.toISOString(),
      at: new Date().toISOString(),
    });

    return created;
  }

  async approveReservation(user: JwtUser, id: number, dto: ApproveReservationDto) {
    if (!['TECH', 'ADMIN'].includes(user.role)) {
      throw new ForbiddenException('Only tech/admin can approve reservations');
    }

    const reservation = await this.prisma.reservation.findUnique({ where: { id } });
    if (!reservation) throw new NotFoundException('Reservation not found');
    if (reservation.status !== 'PENDING') throw new BadRequestException('Reservation not pending');

    // asegura que no exista otra APPROVED cruzada
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
    if (conflict) throw new BadRequestException('Conflict with another approved reservation');

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

  async cancelReservation(user: JwtUser, id: number) {
    const reservation = await this.prisma.reservation.findUnique({ where: { id } });
    if (!reservation) throw new NotFoundException('Reservation not found');

    const isOwner = reservation.studentId === user.sub;
    if (!isOwner && user.role !== 'ADMIN') throw new ForbiddenException('Not allowed');

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

  listByStudent(user: JwtUser) {
    return this.prisma.reservation.findMany({
      where: { studentId: user.sub },
      orderBy: { createdAt: 'desc' },
    });
  }

  listAll() {
    return this.prisma.reservation.findMany({ orderBy: { createdAt: 'desc' } });
  }
}
