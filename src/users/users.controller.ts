import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Session,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthService } from './auth.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';
// c
@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}


  @Get('/whoami')
  whoami(){

  }


  @Post('/signup')
  async signup(@Body() body: CreateUserDto, @Session() session) {
    
    const user= await this.authService.signup(body.email, body.password);
    if(!user){
      throw new BadRequestException("users bad request")
    }
    session.userId=user.id;
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session) {
    const user=await this.authService.signin(body.email, body.password);

    if(!user){
      throw new NotFoundException('')
    }

    session.userId=user.id;
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.usersService.findOne(parseInt(id));
  }

  @Patch()
  update(@Param('id') id: string, @Body() body: CreateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }
}
