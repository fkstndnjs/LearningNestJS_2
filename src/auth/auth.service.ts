import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  login(user: { id: number; name: string; email: string }) {
    return this.jwtService.sign(user);
  }
}
