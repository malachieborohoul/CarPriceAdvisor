import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
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

  @Get('/:id')
  findUser(@Param('id') id: string) {
   return this.usersService.findOne(parseInt(id));
  }

  @Get()
  findAllUser(@Query('email') email:string ) {
    return this.usersService.find(email);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: CreateUserDto) {
    this.usersService.update(parseInt(id), body);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    this.usersService.remove(parseInt(id));
  }
}
