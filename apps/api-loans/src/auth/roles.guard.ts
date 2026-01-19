import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const allowed = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!allowed || allowed.length === 0) return true;

    const req = context.switchToHttp().getRequest();
    let role = String(req.user?.role ?? '').toUpperCase().trim();

    // Normaliza si tu Auth manda TECHNICIAN
    if (role === 'TECHNICIAN') role = 'TECH';

    if (!role || !allowed.map(r => r.toUpperCase()).includes(role)) {
      throw new ForbiddenException(`Only ${allowed.join(', ')} can access`);
    }
    return true;
  }
}
