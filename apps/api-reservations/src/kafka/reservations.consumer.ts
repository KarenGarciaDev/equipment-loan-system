import { Injectable, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { PrismaService } from '../prisma/prisma.service';

type ReservationEvent = {
  event: string;          // "equipment.reserved"
  equipmentId: number;
  studentId: number;
  reservedFrom: string;   // ISO
  reservedTo: string;
  loanId?: number;
};

@Injectable()
export class ReservationsConsumer {
  private readonly logger = new Logger(ReservationsConsumer.name);

  constructor(private readonly prisma: PrismaService) {}

  // 👇 ESTE ES EL CAMBIO CLAVE
  @EventPattern('equipment.reserved')
  async handleReserved(@Payload() payload: ReservationEvent) {
    if (
      !payload?.equipmentId ||
      !payload?.studentId ||
      !payload?.reservedFrom ||
      !payload?.reservedTo
    ) {
      this.logger.warn(`Evento inválido: ${JSON.stringify(payload)}`);
      return;
    }

    await this.prisma.reservation.create({
      data: {
        loanId: payload.loanId ?? null,
        equipmentId: payload.equipmentId,
        studentId: payload.studentId,
        reservedFrom: new Date(payload.reservedFrom),
        reservedTo: new Date(payload.reservedTo),
        status: 'RESERVED',
      },
    });

    this.logger.log(
      `Reservation guardada (equipmentId=${payload.equipmentId})`,
    );
  }
}

