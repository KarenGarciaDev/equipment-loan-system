import { IsNumber, IsDateString } from 'class-validator';

export class CreateReservationDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  equipmentId: number;

  @IsDateString()
  reservationDate: string;
}
