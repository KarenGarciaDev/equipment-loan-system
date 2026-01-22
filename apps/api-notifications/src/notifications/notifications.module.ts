import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsConsumer } from './notifications.consumer';

@Module({
  providers: [NotificationsService, NotificationsConsumer],
})
export class NotificationsModule {}
