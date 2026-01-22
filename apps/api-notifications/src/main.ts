import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['redpanda:9092'], // o tu broker Kafka
        },
        consumer: {
          groupId: 'notifications-consumer', // importante: único por microservicio
        },
      },
    },
  );

  await app.listen();
  console.log('Notifications microservice is listening...');
}
bootstrap();
