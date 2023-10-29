import { BadRequestException, Injectable, NotFoundException, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  @Post('/signup')
  async signup(email: string, password: string) {
    const [user] = await this.usersService.find(email);

    if (user) {
      throw new BadRequestException('email in use');
    }

    const salt = randomBytes(32);

    const pass = user.password+'.'+salt;

    const hash = (await scrypt(pass, salt, 32)) as Buffer;

    return this.usersService.create(email, hash.toString('hex'));
  }


  @Post('/signin')
  async signin(email:string, password: string){
   const [user]= await this.usersService.find(email);

   if(!user){
    throw new NotFoundException('user not found');
   }

   const hashedPassword = user.password.split('.');

//    con


  }
}
