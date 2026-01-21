import { IsInt, IsDateString, IsOptional, IsString, Min } from 'class-validator';

export class CreateReservationDto {
  @IsInt()
  @Min(1)
  equipmentId: number;

  @IsDateString()
  startAt: string;

  @IsDateString()
  endAt: string;

  @IsOptional()
  @IsString()
  reason?: string;
}
