import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // HTTP
  const prefix = process.env.GLOBAL_PREFIX || 'api/v1';
  app.setGlobalPrefix(prefix);

  // Kafka microservice
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: process.env.KAFKA_CLIENT_ID || 'reservations-service',
        brokers: (process.env.KAFKA_BROKERS || 'redpanda:9092').split(','),
      },
      consumer: {
        groupId: process.env.KAFKA_GROUP_ID || 'reservations-consumer',
      },
    },
  });

  await app.startAllMicroservices();

  const port = Number(process.env.PORT || 3004);
  await app.listen(port);

  console.log(`Reservation Service running on http://localhost:${port}/${prefix}`);
}

bootstrap();
