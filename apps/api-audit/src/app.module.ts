// apps/api-audit/src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuditModule } from './audit/audit.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL as string),
    AuditModule,
  ],
})
export class AppModule {}
