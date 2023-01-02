import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

export class UserRepository extends Repository<UserEntity> {
  async saveUser(
    name: string,
    email: string,
    password: string,
    signupVerifyToken: string,
  ) {
    const user = new UserEntity();
    user.name = name;
    user.email = email;
    user.password = password;
    user.signupVerifyToken = signupVerifyToken;
    await this.save(user);
  }
}

export default Repository.extend(UserRepository);
