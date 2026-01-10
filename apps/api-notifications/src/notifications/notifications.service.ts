import { Injectable } from '@nestjs/common';
import { SendNotificationDto } from './dto/send-notification.dto';

@Injectable()
export class NotificationsService {
  send(dto: SendNotificationDto) {
    // Simulación de envío (QA-friendly)
    console.log('📧 Sending notification:', dto);

    return {
      status: 'SENT',
      timestamp: new Date(),
      payload: dto,
    };
  }
}
