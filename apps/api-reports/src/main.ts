import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: process.env.KAFKA_CLIENT_ID || 'reports-service',
        brokers: (process.env.KAFKA_BROKERS || 'redpanda:9092').split(','),
      },
      consumer: {
        groupId: process.env.KAFKA_GROUP_ID || 'reports-consumer',
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(process.env.PORT ? Number(process.env.PORT) : 3007);
  console.log(`🚀 Report Service running`);
}
bootstrap();
