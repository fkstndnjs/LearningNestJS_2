import { Controller, Post, Body, Query, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserInfo } from './dto/user-info.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() body: CreateUserDto): Promise<void> {
    console.log(body);
    return;
  }

  @Post('email-verify')
  async verifyEmail(@Query() query: VerifyEmailDto): Promise<string> {
    console.log(query);
    return;
  }

  @Post('login')
  async login(@Body() body: UserLoginDto): Promise<string> {
    console.log(body);
    return;
  }

  @Get(':id')
  async getUserInfo(@Param('id') userId: string): Promise<UserInfo> {
    console.log(userId);
    return;
  }
}
