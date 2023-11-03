import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(private repo: Repository<User>) {}

  async find(email: string) {
    const user = await this.repo.findBy({ email });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  async findOne(id: number) {
    const user = await this.repo.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, attrs);

    return this.repo.save(user);
  }
}
