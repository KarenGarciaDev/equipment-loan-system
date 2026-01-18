import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';

type UserFromUsersService = {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  isActive: boolean;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  private getIp(req: Request): string {
    const xff = (req.headers['x-forwarded-for'] as string | undefined) ?? '';
    const ipFromHeader = xff.split(',')[0]?.trim();
    return ipFromHeader || req.ip || req.socket?.remoteAddress || 'unknown';
  }

  private getUserAgent(req: Request): string {
    return (req.headers['user-agent'] as string | undefined) ?? 'unknown';
  }
  private async findUserByEmail(email: string): Promise<UserFromUsersService | null> {
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
    }) as any;
  }

  async login(dto: LoginDto, req: Request) {
    const ip = this.getIp(req);
    const userAgent = this.getUserAgent(req);

    let success = false;
    let reason: string | null = null;
    let userId: number | null = null;

    try {
      const user = await this.findUserByEmail(dto.email);
      if (!user || user.isActive === false) {
        reason = 'USER_NOT_FOUND_OR_INACTIVE';
        throw new UnauthorizedException('Invalid credentials');
      }

      userId = user.id;

      const ok = await bcrypt.compare(dto.password, user.password);
      if (!ok) {
        reason = 'INVALID_PASSWORD';
        throw new UnauthorizedException('Invalid credentials');
      }

      success = true;

      const access_token = await this.jwt.signAsync({
        sub: user.id,
        email: user.email,
        role: user.role,
      });


      const refreshPlain = cryptoRandomString(48);
      const refreshHash = await bcrypt.hash(refreshPlain, 10);

      await this.prisma.refreshToken.create({
        data: {
          userId: user.id,
          tokenHash: refreshHash,
          device: 'postman',
          ip,
          userAgent,
          revoked: false,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), 
        },
      });

      return {
        access_token,
        refresh_token: refreshPlain, 
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      };
    } finally {
      await this.prisma.loginAttempt.create({
        data: {
          userId,
          email: dto.email,
          success,
          ip,
          userAgent,
          reason,
        },
      });
    }
  }
}

function cryptoRandomString(length: number) {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let out = '';
  for (let i = 0; i < length; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}
