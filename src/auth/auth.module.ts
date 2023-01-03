import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: true }),
    JwtModule.register({ secret: 'secret', signOptions: { expiresIn: '1d' } }),
  ],
  providers: [AuthService],
})
export class AuthModule {}
