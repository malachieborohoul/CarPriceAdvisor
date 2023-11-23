import { Body, Controller, Param, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  findUser(@Param('id') id: string){
    return this.usersService.findOne(parseInt(id))
  }
  findAllUsers(@Query('email') email:string){
    return this.usersService.find(email);
  }
  update(@Param('id') id: string, @Body() body: CreateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }

  remove(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }
}
