import { IsString } from 'class-validator';

export class ApproveReservationDto {
  @IsString()
  technicianName: string;
}
