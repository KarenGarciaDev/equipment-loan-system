import { Controller, Post, Get, Body } from '@nestjs/common';
import { AuditService } from './audit.service';
import { CreateAuditDto } from './dto/create-audit.dto';

@Controller('api/audit')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  // Crear un registro de auditoría
  @Post()
  create(@Body() dto: CreateAuditDto): any {
    return this.auditService.create(dto);
  }

  // Obtener todos los registros de auditoría
  @Get()
  findAll(): any[] {
    return this.auditService.findAll();
  }
}
