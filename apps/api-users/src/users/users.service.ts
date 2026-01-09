import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  private users: User[] = []; // 👈 AQUÍ ESTÁ LA CLAVE

  create(dto: CreateUserDto): User {
    const user: User = {
      id: Date.now(),
      ...dto,
    };

    this.users.push(user);
    return user;
  }

  findAll(): User[] {
    return this.users;
  }
}
