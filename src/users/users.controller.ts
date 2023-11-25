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

@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  whoami(@Session() session:any) {
    
  }

  @Post('/signout')
  signout(@Session() session: any) {
    session.userId = null;
  }

  @Post('/signup')
  async signup(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    if (user) {
      throw new BadRequestException('email in use');
    }

    session.userId = user.id;

    return user;
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    session.userId = user.id;

    return user;
  }
  @Get('/id')
  findUser(@Param('id') id: string) {
    return this.usersService.findOne(parseInt(id));
  }
  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Patch('/id')
  update(@Param('id') id: string, @Body() body: CreateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }

  @Delete('/id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }
}
