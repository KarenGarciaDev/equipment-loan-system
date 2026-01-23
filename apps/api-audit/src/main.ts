// apps/api-audit/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: (process.env.KAFKA_BROKERS || 'redpanda:9092').split(','),
      },
      consumer: {
        groupId: 'api-audit',
      },
    },
  });

  await app.listen();
  console.log('🛡️ Audit microservice listening (Kafka)');
}
bootstrap();
