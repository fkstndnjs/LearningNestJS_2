import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as uuid from 'uuid';
import { EmailService } from '../email/email.service';
import { UserLoginDto } from './dto/user-login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    private emailService: EmailService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private dataSource: DataSource,
    private authService: AuthService,
  ) {}

  async createUser(body: CreateUserDto) {
    const { name, password, email } = body;

    const userExist = await this.checkUserExists(email);
    if (userExist) {
      throw new ConflictException('이미 가입된 계정입니다.');
    }

    const signupVerifyToken = uuid.v1();

    await this.saveUser(name, email, password, signupVerifyToken);
    await this.sendMemberJoinEmail(email, signupVerifyToken);
  }

  private async checkUserExists(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    return !!user;
  }

  private async saveUser(
    name: string,
    email: string,
    password: string,
    signupVerifyToken: string,
  ) {
    this.dataSource.transaction(async (manager) => {
      const user = new UserEntity();
      user.name = name;
      user.email = email;
      user.password = password;
      user.signupVerifyToken = signupVerifyToken;
      await manager.save(user);
    });
  }

  async findById(id: number) {
    return await this.userRepository.findOne({
      where: { id },
    });
  }

  private async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
    await this.emailService.sendMemberJoinVerification(
      email,
      signupVerifyToken,
    );
  }

  async verifyEmail(signupVerifyToken: string): Promise<{
    token: string;
  }> {
    const user = await this.userRepository.findOne({
      where: {
        signupVerifyToken,
      },
    });

    if (!user) {
      throw new NotFoundException('유저가 존재하지 않습니다.');
    }

    return this.authService.login({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }

  async login(body: UserLoginDto): Promise<{
    token: string;
  }> {
    const { email, password } = body;

    const user = await this.userRepository.findOne({
      where: { email, password },
    });

    if (!user) {
      throw new NotFoundException('유저가 존재하지 않습니다.');
    }

    return this.authService.login({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }

  async getUserInfo(userId: number) {
    throw new Error('Method not implemented');
  }
}
