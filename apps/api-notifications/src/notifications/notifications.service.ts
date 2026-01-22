import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  sendNotification(message: any) {
    // Aquí podrías integrar email, push, SMS, etc.
    console.log('📣 Notification sent:', message);
  }
}

