import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HttpModule } from '@nestjs/axios';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { PrismaService } from '../prisma/prisma.service';
import { ReservationsEventsConsumer } from './reservations.events-consumer';

@Module({
  imports: [
    HttpModule,
    ClientsModule.register([
      {
        name: 'KAFKA_RESERVATIONS',
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
      },
    ]),
  ],
  controllers: [
    ReservationsController,
    ReservationsEventsConsumer,
  ],
  providers: [
    ReservationsService,
    PrismaService,
  ],
})
export class ReservationsModule {}
