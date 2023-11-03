import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('auth')
export class UsersController {
    constructor(private usersService: UsersService){}

    @Get()
    findAllUsers(@Query('email') email:string){
        this.usersService.find(email)
    }

    
}
