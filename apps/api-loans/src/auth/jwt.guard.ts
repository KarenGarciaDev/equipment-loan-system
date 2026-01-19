import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers['authorization'] as string | undefined;

    if (!authHeader) throw new UnauthorizedException('Missing token');

    const token = authHeader.replace(/^Bearer\s+/i, '').trim();

    try {
      const payload = this.jwtService.verify(token);
      req.user = payload; // { sub, email, role, iat, exp }
      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
