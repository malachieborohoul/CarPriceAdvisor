import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  // Signup
  async signup(email: string, password: string) {
    const user = await this.usersService.find(email);

    if (user) {
      throw new BadRequestException('email in use');
    }

    const salt = randomBytes(32).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const result = salt + '.' + hash.toString('hex');

    return this.usersService.create(email, result);
  }

  // S

  async signin(email: string, password: string) {
    const [user] = await this.usersService.find(email);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    const [salt, hash] = user.password.split('.');

    const hashedPassword = (await scrypt(password, salt, 32)) as Buffer;
    const result = hashedPassword.toString('hex');

    if (result !== password) {
      throw new BadRequestException('bad password');
    }

    return user;
  }
}
