import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/jwt.strategy';
import { ReservationsModule } from './reservations/reservations.module';

@Module({
  imports: [PassportModule, ReservationsModule],
  providers: [JwtStrategy],
})
export class AppModule {}
