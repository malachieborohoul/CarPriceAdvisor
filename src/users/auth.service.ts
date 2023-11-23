import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

//
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  async signup(email: string, password: string) {
    const user = await this.usersService.find(email);

    if (user.length) {
      throw new BadRequestException('email in use');
    }

    const salt = randomBytes(24).toString();

    const hash = (await scrypt(salt, password, 32)) as Buffer;

    const result = salt + '.' + hash.toString();

    return this.usersService.create(email, result);
  }

  async signin(email: string, password: string) {
    const [user] = await this.usersService.find(email);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    const [salt, hash] = user.password.split('.');

    const hashedPassword = (await scrypt(salt, password, 32)) as Buffer;

    if (hashedPassword.toString() !== hash) {
      throw new BadRequestException('bad password');
    }

    return user;
  }
}
