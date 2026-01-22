import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    // Aquí definimos lo que estará disponible en req.user
    return {
      sub: Number(payload.sub), // ID del estudiante como número
      email: payload.email,
      role: payload.role,
      name: payload.name ?? null,
    };
  }
}
