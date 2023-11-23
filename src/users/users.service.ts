import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async findOne(id:number){
   const user = await this.userRepository.findOneBy({id});

   if(!user){
    throw new NotFoundException('user not found')
   }
  }
}
