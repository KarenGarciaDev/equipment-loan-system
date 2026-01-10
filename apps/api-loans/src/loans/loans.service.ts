import { Injectable } from '@nestjs/common';
import { Loan } from './loan.entity';
import { CreateLoanDto } from './dto/create-loan.dto';

@Injectable()
export class LoansService {
  private loans: Loan[] = [];

  create(dto: CreateLoanDto): Loan {
    const loan: Loan = {
      id: Date.now(),
      userId: dto.userId,
      equipmentId: dto.equipmentId,
      startDate: new Date(),
      returned: false,
    };

    this.loans.push(loan);
    return loan;
  }

  findAll(): Loan[] {
    return this.loans;
  }

  returnLoan(id: number): Loan | undefined {
    const loan = this.loans.find(l => l.id === id);
    if (loan) {
      loan.returned = true;
      loan.endDate = new Date();
    }
    return loan;
  }
}
