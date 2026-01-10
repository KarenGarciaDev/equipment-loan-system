import { NestFactory } from '@nestjs/core';
import { ReportsModule } from './reports/reports.module';

async function bootstrap() {
  const app = await NestFactory.create(ReportsModule);
  await app.listen(3007);
  console.log('🚀 Report Service running on port 3007');
}

bootstrap();
