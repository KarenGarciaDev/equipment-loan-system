import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ApproveReservationDto } from './dto/approve-reservation.dto';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly service: ReservationsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req: any, @Body() dto: CreateReservationDto) {
    return this.service.createReservation(req.user, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  myReservations(@Req() req: any) {
    return this.service.listByStudent(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  listAll() {
    return this.service.listAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/approve')
  approve(
    @Req() req: any,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ApproveReservationDto,
  ) {
    return this.service.approveReservation(req.user, id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/cancel')
  cancel(@Req() req: any, @Param('id', ParseIntPipe) id: number) {
    return this.service.cancelReservation(req.user, id);
  }
}
