import { Module } from '@nestjs/common';
import { ReservationsConsumer } from './reservations.consumer';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ReservationsConsumer],
})
export class KafkaModule {}

