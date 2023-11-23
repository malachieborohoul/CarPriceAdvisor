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

   return user;
  }

  async find(email:string){
    const user = await this.userRepository.findBy({email});

    if(!user){
        throw new NotFoundException('user not found');
    }

    return user;
  }
  async update(id:number, attrs: Partial<User>){
    const user = await this.findOne(id);

    Object.assign(user, attrs)

    return this.userRepository.save(user)
  }

  async remove(id:number){
    const user = await this.findOne(id)

    return this.userRepository.remove(user);
  }

  async create(email:string, password:string){
    const user= await this.find(email)
  }
}
