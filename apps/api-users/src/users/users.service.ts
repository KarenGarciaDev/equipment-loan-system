import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

type PublicUser = {
  id: number;
  email: string;
  name: string;
  role: string;
  isActive: boolean;
  createdAt?: Date;
};

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  private toPublicUser(user: any): PublicUser {
    const { password, ...rest } = user ?? {};
    return rest as PublicUser;
  }

  async create(dto: CreateUserDto) {
    const exists = await this.prisma.user.findUnique({
      where: { email: dto.email },
      select: { id: true },
    });

    if (exists) throw new BadRequestException('Email ya registrado');

    const hash = await bcrypt.hash(dto.password, 10);

    const created = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hash,
        name: dto.name,
        role: dto.role ?? 'USER',
      },
    });

    return this.toPublicUser(created);
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      orderBy: { id: 'desc' },
    });

    return users.map((u) => this.toPublicUser(u));
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;
    return this.toPublicUser(user);
  }

  async findByEmailWithPassword(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true, 
        name: true,
        role: true,
        isActive: true,
      },
    });
  }
}
