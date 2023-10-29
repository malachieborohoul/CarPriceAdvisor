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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  async signup(@Body() body: CreateUserDto) {
    const user = await this.usersService.find(body.email);

    if (user) {
      throw new BadRequestException('email in use');
    }

    return this.authService.signup(body.email, body.password);
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto) {
    const user = await this.usersService.find(body.email);
    if (!user) {
      throw new NotFoundException('email not found');
    }

    return this.authService.signin(body.email, body.password);
  }

  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.usersService.findOne(parseInt(id));
  }

  @Get()
  findAllUser(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Patch('/:id')
  update(@Param('id') id: string, user: UpdateUserDto) {
    return this.usersService.update(parseInt(id), user);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }
}
