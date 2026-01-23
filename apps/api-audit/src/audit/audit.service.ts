// apps/api-audit/src/audit/audit.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuditEvent } from './audit.schema';

@Injectable()
export class AuditService {
  constructor(
    @InjectModel(AuditEvent.name)
    private readonly auditModel: Model<AuditEvent>,
  ) {}

  async saveEvent(topic: string, message: any) {
    return this.auditModel.create({
      topic,
      type: message.type ?? 'UNKNOWN',
      payload: message,
    });
  }
}
