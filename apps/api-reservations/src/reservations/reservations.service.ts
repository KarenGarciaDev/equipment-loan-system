import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateReservationDto) {
    return this.prisma.reservation.create({
      data: {
        userId: dto.userId,
        equipmentId: dto.equipmentId,
        reservationDate: new Date(dto.reservationDate),
      },
    });
  }

  findAll() {
    return this.prisma.reservation.findMany({
      orderBy: { id: 'desc' },
    });
  }

  async cancel(id: number) {
    const exists = await this.prisma.reservation.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Reservation not found');

    return this.prisma.reservation.update({
      where: { id },
      data: { status: 'CANCELLED' },
    });
  }
}
