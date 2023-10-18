import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/dtos/create-user.dto';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    const user = await this.usersService.create(body.email, body.password);

    console.log(user);
  }

  @Get()
  findUser(id: number) {
    this.usersService.findOne(id);
  }

  @Get()
  findAllUser() {
    this.usersService.find();
  }

  @Patch()
  updateUser(id: number) {
    this.usersService.update(id);
  }

  @Delete()
  removeUser(id: number) {
    this.usersService.remove(id);
  }
}
