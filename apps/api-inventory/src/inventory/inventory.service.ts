import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { KafkaProducerService } from '../kafka/kafka.producer';

@Injectable()
export class InventoryService {
  constructor(
    private readonly kafka: KafkaProducerService,
    private readonly prisma: PrismaService,
  ) {}

  async create(dto: CreateEquipmentDto) {
    // 1) Guardar en DB
    const created = await this.prisma.equipment.create({ data: dto });

    // 2) Publicar evento a Kafka
    await this.kafka.emit(
      process.env.KAFKA_TOPIC_EQUIPMENT || 'equipment.events',
      {
        type: 'EQUIPMENT_CREATED',
        id: created.id,
        name: created.name,
        at: new Date().toISOString(),
      },
    );

    // 3) Responder al cliente
    return created;
  }

  findAll() {
    return this.prisma.equipment.findMany({ orderBy: { id: 'desc' } });
  }

  async updateStatus(id: number, dto: UpdateStatusDto) {
    const exists = await this.prisma.equipment.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Equipment not found');

    const updated = await this.prisma.equipment.update({
      where: { id },
      data: { status: dto.status },
    });

    // (Opcional) evento de cambio de estado
    // await this.kafka.emit(process.env.KAFKA_TOPIC_EQUIPMENT || 'equipment.events', {
    //   type: 'EQUIPMENT_STATUS_UPDATED',
    //   id: updated.id,
    //   status: updated.status,
    //   at: new Date().toISOString(),
    // });

    return updated;
  }
}
