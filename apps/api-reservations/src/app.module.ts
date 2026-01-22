import { Module } from '@nestjs/common';
import { ReservationsModule } from './reservations/reservations.module';
import { PrismaModule } from './prisma/prisma.module';
import { KafkaModule } from './kafka/kafka.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    PrismaModule,
    KafkaModule,
    AuthModule,
    ReservationsModule,
  ],
})
export class AppModule {}
