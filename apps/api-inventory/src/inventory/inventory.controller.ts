import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@Controller('equipment')
export class InventoryController {
  constructor(private readonly service: InventoryService) {}

  @Post()
  create(@Body() dto: CreateEquipmentDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateStatusDto) {
    return this.service.updateStatus(Number(id), dto);
  }
}
