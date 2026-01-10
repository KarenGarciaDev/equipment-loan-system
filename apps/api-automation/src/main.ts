import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3008);
  console.log('🚀 Automation Service running on port 3008');
}
bootstrap();
