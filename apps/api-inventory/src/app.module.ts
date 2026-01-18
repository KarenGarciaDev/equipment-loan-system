import { Module } from '@nestjs/common';
import { KafkaModule } from "./kafka/kafka.module";
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { InventoryModule } from './inventory/inventory.module';
import { HealthController } from './health.controller';

@Module({
  imports: [
    KafkaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    InventoryModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
