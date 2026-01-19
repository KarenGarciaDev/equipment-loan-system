import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const allowed = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);

    if (!allowed || allowed.length === 0) return true;

    const req = ctx.switchToHttp().getRequest();
    let role = (req.user?.role || '').toUpperCase().trim();

    // por si viene TECHNICIAN desde users
    if (role === 'TECHNICIAN') role = 'TECH';

    if (!role || !allowed.includes(role)) {
      throw new ForbiddenException(`Only ${allowed.join(', ')} can access`);
    }
    return true;
  }
}
