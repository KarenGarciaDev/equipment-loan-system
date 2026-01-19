import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';

import { LoansService } from './loans.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanStatusDto } from './dto/update-loan-status.dto';

import { JwtGuard } from '../auth/jwt.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('loans')
export class LoansController {
  constructor(private readonly service: LoansService) {}

  // ✅ Crear préstamo: SOLO STUDENT (toma studentId desde el token)
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('STUDENT')
  @Post()
  create(@Body() dto: CreateLoanDto, @Req() req: Request) {
    return this.service.create(dto, req);
  }

  // ✅ Listar préstamos:
  // - TECH: ve todos
  // - STUDENT: ve solo los suyos
  @UseGuards(JwtGuard)
  @Get()
  findAll(@Req() req: Request) {
    return this.service.findAll(req);
  }

  // ✅ Cambiar estado: SOLO TECH
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('TECH')
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateLoanStatusDto,
    @Req() req: Request,
  ) {
    return this.service.updateStatus(Number(id), dto, req);
  }
}
