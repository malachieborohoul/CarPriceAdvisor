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

    async findOne(id:number){
        const user = await this.repo.findOneBy({id});

        if(!user){
            throw new NotFoundException("user not found");
        }
        return user;
    }

    async create(email: string, password: string){
        const user = await this.find(email);

        if(!user){
            throw new NotFoundException("user not found");
        }

        const result = {email, password};

        return this.repo.save(result);
    }

   
}
