import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { PrismaService } from '../prisma/prisma.service';

@Controller()
export class ReservationsEventsConsumer {
  constructor(private readonly prisma: PrismaService) {}

  @EventPattern('equipment.events')
  async onEquipmentEvent(@Payload() message: any) {
    const evt = message?.value ?? message;
    if (!evt?.type) return;

    if (evt.type === 'EQUIPMENT_DELETED') {
      const equipmentId = Number(evt.id);
      if (!equipmentId) return;

      await this.prisma.reservation.updateMany({
        where: {
          equipmentId,
          status: { in: ['PENDING'] },
        },
        data: { status: 'CANCELLED' },
      });

      console.log(`Reservas PENDING canceladas para equipo ${equipmentId}`);
    }
  }
}
