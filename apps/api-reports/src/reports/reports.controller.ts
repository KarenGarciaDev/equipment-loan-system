import { Controller, Post, Get, Body } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('api/reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  create(@Body() body: { title: string; content: string }) {
    return this.reportsService.create(body);
  }

  @Get()
  findAll() {
    return this.reportsService.findAll();
  }
}
