import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EachMessagePayload } from 'kafkajs';

@Injectable()
export class EquipmentConsumer {
  constructor(private readonly prisma: PrismaService) { }

  async handle({ message }: EachMessagePayload) {
    if (!message.value) return;

    const event = JSON.parse(message.value.toString());

    if (event.type !== 'EQUIPMENT_CREATED') return;

    await this.prisma.equipmentSnapshot.upsert({
      where: { equipmentId: event.id },
      update: {
        name: event.name,
        status: 'AVAILABLE',
      },
      create: {
        equipmentId: event.id,
        name: event.name,
        status: event.status,
      },
    });
  }
}
