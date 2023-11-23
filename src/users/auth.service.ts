import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt)

// Inject
@Injectable()
export class AuthService {
    constructor(private usersService: UsersService){}
    async signup(email:string, password:string){
       const user = await this.usersService.find(email)

       if(user.length){
        throw new BadRequestException('email in use');
       }

       const salt = randomBytes(24).toString()


    }
}
