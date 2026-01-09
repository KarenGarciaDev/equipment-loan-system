import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // 🔴 Simulación de usuario (QA READY)
    if (email !== 'admin@test.com' || password !== '123456') {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: 1,
      email,
      role: 'ADMIN',
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
