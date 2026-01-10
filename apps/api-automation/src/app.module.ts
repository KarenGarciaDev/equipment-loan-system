import { Module } from '@nestjs/common';
import { AutomationModule } from './automation/automation.module';

@Module({
  imports: [AutomationModule],
})
export class AppModule {}
