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
    await this.usersService.createUser(body);
  }

  @Post('email-verify')
  async verifyEmail(@Query() query: VerifyEmailDto): Promise<string> {
    const { signupVerifyToken } = query;

    return await this.usersService.verifyEmail(signupVerifyToken);
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
