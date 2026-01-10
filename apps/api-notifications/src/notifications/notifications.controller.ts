import { Controller, Post, Body } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { SendNotificationDto } from './dto/send-notification.dto';

@Controller('api/notifications')
export class NotificationsController {
  constructor(private readonly service: NotificationsService) {}

  @Post()
  send(@Body() dto: SendNotificationDto) {
    return this.service.send(dto);
  }
}
