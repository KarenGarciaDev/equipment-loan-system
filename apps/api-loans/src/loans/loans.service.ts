import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import type { Request } from 'express';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

import { PrismaService } from '../prisma/prisma.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanStatusDto } from './dto/update-loan-status.dto';

@Injectable()
export class LoansService {
  constructor(private prisma: PrismaService, private http: HttpService) {}

  private roleFromReq(req: Request) {
    let role = String((req as any).user?.role ?? '').toUpperCase().trim();
    if (role === 'TECHNICIAN') role = 'TECH';
    return role;
  }

  private userIdFromReq(req: Request) {
    const sub = (req as any).user?.sub;
    const id = Number(sub);
    if (!id) throw new BadRequestException('Invalid token sub');
    return id;
  }

  // URLs por env (recomendado en microservicios)
  private usersUrl() {
    return process.env.USERS_SERVICE_URL; // ej: http://api-users:3001/api/v1
  }
  private inventoryUrl() {
    return process.env.INVENTORY_SERVICE_URL; // ej: http://api-inventory:3004/api/v1
  }

  private async getUser(userId: number) {
    const base = this.usersUrl();
    if (!base) return null;
    try {
      const res = await firstValueFrom(this.http.get(`${base}/users/${userId}`));
      return res.data;
    } catch {
      return null;
    }
  }

  private async getEquipment(equipmentId: number) {
    const base = this.inventoryUrl();
    if (!base) return null;
    try {
      const res = await firstValueFrom(this.http.get(`${base}/equipment/${equipmentId}`));
      return res.data;
    } catch {
      return null;
    }
  }

  async create(dto: CreateLoanDto, req: Request) {
    const role = this.roleFromReq(req);
    if (role !== 'STUDENT') throw new ForbiddenException('Only STUDENT can create loans');

    const studentId = this.userIdFromReq(req);

    const from = new Date(dto.reservedFrom);
    const to = new Date(dto.reservedTo);
    if (!(from < to)) throw new BadRequestException('reservedFrom must be < reservedTo');

    const loan = await this.prisma.loan.create({
      data: {
        studentId,
        equipmentId: dto.equipmentId,
        reservedFrom: from,
        reservedTo: to,
        status: 'RESERVED',
      },
    });

    return loan;
  }

  async findAll(req: Request) {
    const role = this.roleFromReq(req);
    const userId = this.userIdFromReq(req);

    const where =
      role === 'TECH'
        ? {}
        : { studentId: userId };

    const loans = await this.prisma.loan.findMany({
      where,
      orderBy: { id: 'desc' },
    });

    // “Enriquecer” para que no salgan solo números
    const enriched = await Promise.all(
      loans.map(async (l) => {
        const user = await this.getUser(l.studentId);
        const eq = await this.getEquipment(l.equipmentId);

        return {
          ...l,
          student: user ? { id: user.id, name: user.name, email: user.email, role: user.role } : null,
          equipment: eq ? { id: eq.id, name: eq.name, code: eq.code } : null,
        };
      }),
    );

    return enriched;
  }

  async updateStatus(id: number, dto: UpdateLoanStatusDto, req: Request) {
    const role = this.roleFromReq(req);
    if (role !== 'TECH') throw new ForbiddenException('Only TECH can set this status');

    const loan = await this.prisma.loan.findUnique({ where: { id } });
    if (!loan) throw new NotFoundException('Loan not found');

    return this.prisma.loan.update({
      where: { id },
      data: { status: dto.status },
    });
  }
}
