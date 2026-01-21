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
            clientId: 'reservations-service',
            brokers: ['redpanda:9092'],
          },
          consumer: {
            groupId: 'reservations-consumer',
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