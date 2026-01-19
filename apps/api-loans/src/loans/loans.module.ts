import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';

import { LoansController } from './loans.controller';
import { LoansService } from './loans.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [
    HttpModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [LoansController],
  providers: [LoansService, PrismaService],
})
export class LoansModule {}
