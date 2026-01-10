import { Injectable } from '@nestjs/common';
import { InventoryItem } from './inventory.entity';
import { CreateItemDto } from './dto/create-item.dto';

@Injectable()
export class InventoryService {
  private items: InventoryItem[] = [];

  create(dto: CreateItemDto): InventoryItem {
    const item: InventoryItem = {
      id: Date.now(),
      name: dto.name,
      serial: dto.serial,
      available: true,
    };

    this.items.push(item);
    return item;
  }

  findAll(): InventoryItem[] {
    return this.items;
  }

  markUnavailable(id: number) {
    const item = this.items.find(i => i.id === id);
    if (item) item.available = false;
  }

  markAvailable(id: number) {
    const item = this.items.find(i => i.id === id);
    if (item) item.available = true;
  }
}
