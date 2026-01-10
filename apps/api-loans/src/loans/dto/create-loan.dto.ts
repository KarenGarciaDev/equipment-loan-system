import { IsNumber, IsDateString } from 'class-validator';

export class CreateLoanDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  equipmentId: number;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;
}
