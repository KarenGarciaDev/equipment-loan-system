import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@Injectable()
export class InventoryService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateEquipmentDto) {
    return this.prisma.equipment.create({ data: dto });
  }

  findAll() {
    return this.prisma.equipment.findMany({ orderBy: { id: 'desc' } });
  }

  async updateStatus(id: number, dto: UpdateStatusDto) {
    const exists = await this.prisma.equipment.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Equipment not found');

    return this.prisma.equipment.update({
      where: { id },
      data: { status: dto.status },
    });
  }
}

