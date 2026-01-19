import { IsIn } from 'class-validator';

export class UpdateLoanStatusDto {
  @IsIn(['RESERVED','APPROVED','BORROWED','RETURNED','CANCELLED'])
  status: 'RESERVED'|'APPROVED'|'BORROWED'|'RETURNED'|'CANCELLED';
}
