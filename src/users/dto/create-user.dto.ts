import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(10)
  name: string;

  @IsString()
  @MinLength(3)
  password: string;

  @IsEmail()
  email: string;
}
