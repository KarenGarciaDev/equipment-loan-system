import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3009); 
  console.log('🚀 Integration Service running on port 3009');
}
bootstrap();
