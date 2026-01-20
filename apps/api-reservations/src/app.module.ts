import { Module } from '@nestjs/common';
import { ReservationsModule } from './reservations/reservations.module';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [ReservationsModule, KafkaModule],
})
export class AppModule {}
