import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt/jwt.guard';
import { CurrentUser } from './common/decorator/currentUser';
import { UserEntity } from './users/entities/user.entity';

@UseGuards(JwtAuthGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@CurrentUser() user: UserEntity) {
    return user;
  }

  @Get('test')
  getHelloTest(@CurrentUser() user: UserEntity) {
    return user;
  }
}
