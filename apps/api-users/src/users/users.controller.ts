import { Body, Controller, Get, Headers, Param, Post, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('by-email/:email')
  findByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @Get('internal/by-email/:email')
  async internalByEmail(
    @Param('email') email: string,
    @Headers('x-internal-token') token: string,
  ) {
    if (!token || token !== process.env.INTERNAL_TOKEN) {
      throw new UnauthorizedException('Internal only');
    }
    return this.usersService.findByEmailWithPassword(email);
  }
}
