import {
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
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { Serialize } from './interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { User } from './user.entity';

@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {} 
  @UseInterceptors(CurrentUserInterceptor)
  @Get('/whoami')
  whoami(@CurrentUser() user: User) {
    return user;
  }
// SIGN
  @Post('/signup')
  async signup(@Body() body: CreateUserDto, @Session() session:any) {
    const user = await this.usersService.find(body.email);
    if (user) {
      throw new NotFoundException('email in use');
    }
    const result = await this.authService.signup(body.email, body.password);
    session.userId = result.id;

    return result;
  }
  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session:any) {
    const user = await this.usersService.find(body.email);

    if (!user) {
      throw new NotFoundException('user not found');
    }
    const result = await this.authService.signin(body.email, body.password);
    session.userId = result.id;
    return result;
  }

  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.usersService.findOne(parseInt(id));
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() body: CreateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }
}
