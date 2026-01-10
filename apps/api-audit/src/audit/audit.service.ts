import { Injectable } from '@nestjs/common';
import { CreateAuditDto } from './dto/create-audit.dto';

export interface Audit {
  id: number;
  userId: number;
  action: string;
  resource: string;
  timestamp: Date;
}

@Injectable()
export class AuditService {
  private audits: Audit[] = [];

  create(dto: CreateAuditDto): Audit {
    const audit: Audit = {
      id: Date.now(),
      timestamp: dto.timestamp || new Date(),
      ...dto,
    };
    this.audits.push(audit);
    return audit;
  }

  findAll(): Audit[] {
    return this.audits;
  }
}
