import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { PrismaService } from '../prisma/prisma.service';

@Controller()
export class ReservationsEventsConsumer {
  constructor(private readonly prisma: PrismaService) { }

  @EventPattern('equipment.events')
  async handleEquipmentEvent(@Payload() message: any) {
    const event = typeof message === 'string' ? JSON.parse(message) : message;

    if (event.type === 'EQUIPMENT_CREATED') {
      await this.prisma.equipmentSnapshot.upsert({
        where: { equipmentId: event.id },
        update: {
          name: event.name,
          status: 'AVAILABLE',
        },
        create: {
          equipmentId: event.id,
          name: event.name,
          status: 'AVAILABLE',
        },
      });
    }
  }
}