import { Injectable, Logger } from '@nestjs/common';
import { Ctx, EventPattern, KafkaContext } from '@nestjs/microservices';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class KafkaService {
  private readonly logger = new Logger(KafkaService.name);

  constructor(private readonly prisma: PrismaService) { }

  @EventPattern('equipment.events')
  async handleEquipmentEvents(
    message: any,
    @Ctx() context: KafkaContext,
  ) {
    const value = message.value;

    this.logger.log(`Evento recibido: ${JSON.stringify(value)}`);

    if (value.type === 'EQUIPMENT_CREATED') {
      await this.prisma.equipmentSnapshot.upsert({
        where: { equipmentId: value.id },
        update: {
          name: value.name,
          status: 'AVAILABLE',
        },
        create: {
          equipmentId: value.id,
          name: value.name,
          status: value.status,
        },
      });

      this.logger.log(`Snapshot creado para equipment ${value.id}`);
    }
  }
}
