import { Controller, Post, Body } from '@nestjs/common';
import { AutomationService } from './automation.service';

@Controller('api/automation')
export class AutomationController {
  constructor(private readonly automationService: AutomationService) {}

  @Post('trigger')
  trigger(@Body() body: { flowName: string; payload: any }) {
    return this.automationService.triggerFlow(body.flowName, body.payload);
  }
}
