import { IsOptional, IsString, Length } from 'class-validator';

export class CreateEquipmentDto {
  @IsString()
  @Length(2, 50)
  code: string;

  @IsString()
  @Length(2, 120)
  name: string;

  @IsOptional()
  @IsString()
  @Length(0, 500)
  description?: string;
}
