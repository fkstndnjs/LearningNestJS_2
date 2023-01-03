import { Injectable } from '@nestjs/common';
import jwt from 'jsonwebtoken';
@Injectable()
export class AuthService {
  login(user: { id: number; name: string; email: string }) {
    return jwt.sign(user, 'secret', {
      expiresIn: '1d',
    });
  }
}
