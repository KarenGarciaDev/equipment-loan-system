// apps/api-audit/src/audit/audit.controller.ts
import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload, Ctx, KafkaContext } from '@nestjs/microservices';
import { AuditService } from './audit.service';

@Controller()
export class AuditController {
  private readonly logger = new Logger(AuditController.name);

  constructor(private readonly auditService: AuditService) {}

  @EventPattern('reservation.events')
  async handleReservationEvents(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const topic = context.getTopic();

    this.logger.log(`📥 EVENT FROM ${topic}`);
    this.logger.debug(message);

    await this.auditService.saveEvent(topic, message);
  }
}
