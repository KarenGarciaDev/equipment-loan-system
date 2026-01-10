import { Controller, Post, Body } from '@nestjs/common';
import { IntegrationService } from './integration.service';

@Controller('api/integration')
export class IntegrationController {
  constructor(private readonly integrationService: IntegrationService) {}

  @Post('event')
  sendEvent(@Body() payload: any) {
    return this.integrationService.sendEvent(payload);
  }
}
