import {
  Controller,
  Post,
  Body,
  Query,
  Get,
  Param,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() body: CreateUserDto): Promise<void> {
    await this.usersService.createUser(body);
  }

  @Post('email-verify')
  async verifyEmail(@Query() query: VerifyEmailDto): Promise<{
    token: string;
  }> {
    const { signupVerifyToken } = query;

    return await this.usersService.verifyEmail(signupVerifyToken);
  }

  @Post('login')
  async login(@Body() body: UserLoginDto): Promise<{
    token: string;
  }> {
    return await this.usersService.login(body);
  }

  @Get(':id')
  async getUserInfo(@Param('id', ParseIntPipe) userId: number) {
    return await this.usersService.getUserInfo(userId);
  }

  @Get()
  getAllUsers(
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    console.log(offset, limit);
  }
}
