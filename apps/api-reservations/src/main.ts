import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(process.env.GLOBAL_PREFIX || 'api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );


  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: (process.env.KAFKA_BROKERS || 'redpanda:9092').split(','),
        clientId: process.env.KAFKA_CLIENT_ID || 'api-reservations',
      },
      consumer: {
        groupId: process.env.KAFKA_GROUP_ID || 'api-reservations',
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(process.env.PORT || 3004);
}

bootstrap();
