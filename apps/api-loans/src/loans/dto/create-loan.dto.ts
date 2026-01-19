import { IsInt, IsISO8601 } from 'class-validator';

export class CreateLoanDto {
  @IsInt()
  studentId: number;

  @IsInt()
  equipmentId: number;

  @IsISO8601()
  reservedFrom: string;

  @IsISO8601()
  reservedTo: string;
}
