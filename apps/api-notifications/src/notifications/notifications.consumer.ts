import { Injectable, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotificationsService } from './notifications.service';

@Injectable()
export class NotificationsConsumer {
  private readonly logger = new Logger(NotificationsConsumer.name);

  constructor(private readonly notificationsService: NotificationsService) {}

  // Consumir todos los eventos de reservaciones
  @EventPattern('reservation.events')
  async handleReservationEvents(@Payload() message: any) {
    this.logger.log('Received reservation event: ' + JSON.stringify(message.value));

    // Aquí mandamos la "notificación"
    this.notificationsService.sendNotification(message.value);
  }
}
