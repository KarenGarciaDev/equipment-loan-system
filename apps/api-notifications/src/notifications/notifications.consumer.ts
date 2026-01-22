import { Injectable, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotificationsService } from './notifications.service';

@Injectable()
export class NotificationsConsumer {
  private readonly logger = new Logger(NotificationsConsumer.name);

  constructor(private readonly notificationsService: NotificationsService) {}

  @EventPattern(process.env.KAFKA_TOPIC || 'reservation.events')
  async handleReservationEvents(@Payload() message: any) {
    try {
      // KafkaJS puede entregar { value: Buffer } o el objeto directo
      const payload =
        message?.value && Buffer.isBuffer(message.value)
          ? JSON.parse(message.value.toString())
          : message?.value && typeof message.value === 'string'
            ? JSON.parse(message.value)
            : message?.value
              ? message.value
              : message;

      this.logger.log(`✅ Received reservation event: ${JSON.stringify(payload)}`);
      this.notificationsService.sendNotification(payload);
    } catch (error) {
      this.logger.error('❌ Error parsing reservation event', error as any);
    }
  }
}
