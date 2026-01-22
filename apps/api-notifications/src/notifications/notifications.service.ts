import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  sendNotification(payload: any) {
    // Aquí luego conectas email / sms / push
    this.logger.log(`📨 Notification sent (mock): ${JSON.stringify(payload)}`);
  }
}
