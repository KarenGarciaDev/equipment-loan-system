import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const brokers = (process.env.KAFKA_BROKERS || 'redpanda:9092').split(',');
  const groupId = process.env.KAFKA_GROUP_ID || 'api-notifications-server';

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'api-notifications',
          brokers,
        },
        consumer: {
          groupId,
        },
        // IMPORTANTE: para ver mensajes aunque el grupo sea nuevo/recién creado
        subscribe: {
          fromBeginning: true,
        },
      },
    },
  );

  await app.listen();
  // eslint-disable-next-line no-console
  console.log('✅ Notifications microservice is listening (Kafka)...');
}
bootstrap();
