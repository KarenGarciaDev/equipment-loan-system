import { Controller, Logger } from '@nestjs/common';
import { Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class NotificationsController {
  private readonly logger = new Logger(NotificationsController.name);

  // Debe coincidir EXACTO con el topic
  @MessagePattern('reservation.events')
  handleReservationEvents(@Payload() message: any, @Ctx() context: KafkaContext) {
    try {
      const rawValue =
        message?.value?.toString?.() ??
        message?.value ??
        JSON.stringify(message);

      const parsed = (() => {
        try {
          return JSON.parse(rawValue);
        } catch {
          return { rawValue };
        }
      })();

      const topic = context.getTopic();
      this.logger.log(`📩 EVENT RECEIVED FROM ${topic}`);
      this.logger.log(parsed);
    } catch (err: any) {
      this.logger.error('❌ Error handling Kafka message', err?.stack || err?.message || err);
    }
  }
}
