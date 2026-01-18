import { IsEnum } from 'class-validator';

export enum EquipmentStatus {
  AVAILABLE = 'AVAILABLE',
  RESERVED = 'RESERVED',
  LOANED = 'LOANED',
  MAINTENANCE = 'MAINTENANCE',
}

export class UpdateStatusDto {
  @IsEnum(EquipmentStatus)
  status: EquipmentStatus;
}
