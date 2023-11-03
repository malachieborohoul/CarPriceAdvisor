import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('auth')
export class UsersController {
    constructor(private usersService: UsersService){}

    @Get()
    findAllUsers(@Query('email') email:string){
        return this.usersService.find(email)
    }

    @Get('/:id')
    findUser(@Param('id') id:string){
        return this.usersService.findOne(parseInt(id));
    }

    @Patch()
    update(@Param('id') id:string, @Body() body: CreateUserDto){
        return this.usersService.update(parseInt(id), body);
    }



    
}
