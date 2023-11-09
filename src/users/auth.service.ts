import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    const [user] = await this.usersService.find(email);

    if (user) {
      throw new BadRequestException('email in use');
    }

    const salt = randomBytes(8).toString('hex');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const hashedPassword = salt + '.' + hash.toString('hex');

    return this.usersService.create(email, hashedPassword);
  }

  async signin(email: string, password: string) {
    const [user] = await this.usersService.find(email);

    if(!user){
         throw new NotFoundException("user not found");
    }

    const [salt, hashedPassword]= user.password.split('.');

    const pass = (await scrypt(password, salt,32)) as Buffer;

    if(hashedPassword !== pass.toString('hex')){
        throw new BadRequestException("bad password");
    }

    return user;

  }
}
