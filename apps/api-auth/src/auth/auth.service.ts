import {
  Injectable,
  UnauthorizedException,
  ServiceUnavailableException,
  OnModuleDestroy,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { randomBytes } from 'crypto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import Redis from 'ioredis';
import type { AxiosError } from 'axios';

type UserFromUsersService = {
  id: number;
  email: string;
  password: string; // bcrypt hash o texto plano (dev)
  name: string;
  role: string;
  isActive: boolean;
};

@Injectable()
export class AuthService implements OnModuleDestroy {
  private readonly redis: Redis;

  private readonly MAX_FAILS_EMAIL = 5;
  private readonly MAX_FAILS_IP = 20;
  private readonly FAIL_TTL_SECONDS = 600; // 10 min
  private readonly USER_CACHE_SECONDS = 60;

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly http: HttpService,
  ) {
    // IMPORTANTE: dentro de Docker, usa el nombre del servicio redis (ej: redis-cache)
    // En local, puede ser localhost
    this.redis = new Redis(process.env.REDIS_URL || 'redis://redis-cache:6379', {
      maxRetriesPerRequest: 1,
      enableReadyCheck: true,
    });
  }

  async onModuleDestroy() {
    try {
      await this.redis.quit();
    } catch {}
  }

  private getIp(req: Request): string {
    const xff = (req.headers['x-forwarded-for'] as string | undefined) ?? '';
    const ipFromHeader = xff.split(',')[0]?.trim();
    return ipFromHeader || req.ip || req.socket?.remoteAddress || 'unknown';
  }

  private getUserAgent(req: Request): string {
    return (req.headers['user-agent'] as string | undefined) ?? 'unknown';
  }

  private normalizeRole(role: string): string {
    const r = (role || '').toUpperCase().trim();
    if (r === 'TECHNICIAN') return 'TECH';
    return r;
  }

  // ---------------- REDIS keys ----------------
  private failKey(email: string) {
    return `login:fail:email:${email.toLowerCase()}`;
  }
  private failIpKey(ip: string) {
    return `login:fail:ip:${ip}`;
  }
  private userCacheKey(email: string) {
    return `user:by-email:${email.toLowerCase()}`;
  }

  private async isBlocked(email: string, ip: string) {
    try {
      const [failEmail, failIp] = await Promise.all([
        this.redis.get(this.failKey(email)),
        this.redis.get(this.failIpKey(ip)),
      ]);

      const nEmail = Number(failEmail || 0);
      const nIp = Number(failIp || 0);

      return nEmail >= this.MAX_FAILS_EMAIL || nIp >= this.MAX_FAILS_IP;
    } catch {
      return false;
    }
  }

  private async registerFail(email: string, ip: string) {
    try {
      const keyEmail = this.failKey(email);
      const keyIp = this.failIpKey(ip);

      const [n1, n2] = await Promise.all([
        this.redis.incr(keyEmail),
        this.redis.incr(keyIp),
      ]);

      const [ttl1, ttl2] = await Promise.all([
        this.redis.ttl(keyEmail),
        this.redis.ttl(keyIp),
      ]);

      if (ttl1 < 0) await this.redis.expire(keyEmail, this.FAIL_TTL_SECONDS);
      if (ttl2 < 0) await this.redis.expire(keyIp, this.FAIL_TTL_SECONDS);

      return { failEmail: n1, failIp: n2 };
    } catch {
      return { failEmail: 0, failIp: 0 };
    }
  }

  private async clearFails(email: string, ip: string) {
    try {
      await Promise.all([
        this.redis.del(this.failKey(email)),
        this.redis.del(this.failIpKey(ip)),
      ]);
    } catch {}
  }

  // -------------- USERS lookup (cache + internal token) --------------
  private buildUsersUrl(baseUrl: string, email: string) {
    // soporta baseUrl con o sin /api/v1
    const clean = baseUrl.replace(/\/+$/, '');
    return `${clean}/users/internal/by-email/${encodeURIComponent(email)}`;
  }

  private async getUserFromUsersService(email: string): Promise<UserFromUsersService | null> {
    // cache
    try {
      const cached = await this.redis.get(this.userCacheKey(email));
      if (cached) return JSON.parse(cached) as UserFromUsersService;
    } catch {}

    const baseUrl = process.env.USERS_SERVICE_URL; // ejemplo: http://api-users:3001/api/v1  (o sin /api/v1)
    const internalToken = process.env.INTERNAL_TOKEN;

    if (!baseUrl || !internalToken) {
      throw new ServiceUnavailableException('Users service not configured');
    }

    const url = this.buildUsersUrl(baseUrl, email);

    try {
      const resp = await firstValueFrom(
        this.http.get<UserFromUsersService | null>(url, {
          headers: { 'x-internal-token': internalToken },
          timeout: 5000,
        }),
      );

      const user = resp.data;
      if (!user) return null;

      // cache short
      try {
        await this.redis.set(
          this.userCacheKey(email),
          JSON.stringify(user),
          'EX',
          this.USER_CACHE_SECONDS,
        );
      } catch {}

      return user;
    } catch (err) {
      const e = err as AxiosError;

      // Si el servicio responde, pero deniega por token, dilo claro
      if (e.response?.status === 401 || e.response?.status === 403) {
        throw new ServiceUnavailableException('Users service internal auth failed (x-internal-token)');
      }

      // Si es 404, solo significa que no existe
      if (e.response?.status === 404) {
        return null;
      }

      throw new ServiceUnavailableException('Users service unavailable');
    }
  }

  // ---------------- LOGIN ----------------
  async login(dto: LoginDto, req: Request) {
    const ip = this.getIp(req);
    const userAgent = this.getUserAgent(req);

    let success = false;
    let reason: string | null = null;
    let userId: number | null = null;
    let userRole: string | null = null;
    let userName: string | null = null;

    try {
      // bloqueo por intentos
      const blocked = await this.isBlocked(dto.email, ip);
      if (blocked) {
        reason = 'RATE_LIMITED';
        throw new UnauthorizedException('Too many attempts');
      }

      const user = await this.getUserFromUsersService(dto.email);

      if (!user || user.isActive === false) {
        reason = 'USER_NOT_FOUND_OR_INACTIVE';
        await this.registerFail(dto.email, ip);
        throw new UnauthorizedException('Invalid credentials');
      }

      userId = user.id;
      userRole = user.role;
      userName = user.name;

      let ok = false;

      // bcrypt hash
      if (user.password && user.password.startsWith('$2')) {
        ok = await bcrypt.compare(dto.password, user.password);
      } else {
        // texto plano (solo dev)
        ok = dto.password === user.password;
      }

      if (!ok) {
        reason = 'INVALID_PASSWORD';
        await this.registerFail(dto.email, ip);
        throw new UnauthorizedException('Invalid credentials');
      }

      success = true;
      await this.clearFails(dto.email, ip);

      const role = this.normalizeRole(user.role);
      const payload = { sub: user.id, email: user.email, name: user.name, role };

      const access_token = await this.jwt.signAsync(payload);

      const refreshPlain = randomBytes(48).toString('base64url');
      const refreshHash = await bcrypt.hash(refreshPlain, 10);

      await this.prisma.refreshToken.create({
        data: {
          userId: user.id, // SOLO numero, sin FK en DB (ver prisma schema)
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
        user: { id: user.id, email: user.email, name: user.name, role },
      };
    } finally {
      // auditoría no puede tumbar login
      try {
        await this.prisma.loginAttempt.create({
          data: {
            userId,
            email: dto.email,
            success,
            ip,
            userAgent,
            reason: reason ?? 'AUTH_ERROR',
            userRole,
            userName,
          },
        });
      } catch {}
    }
  }
}
