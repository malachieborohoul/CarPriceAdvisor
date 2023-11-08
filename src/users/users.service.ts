import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(private repo: Repository<User>){}

    async find(email: string){
      const user= await  this.repo.findBy({email});

      if(!user){
        throw new NotFoundException("user not found");
      }

      return user;
    }

    
   
}
