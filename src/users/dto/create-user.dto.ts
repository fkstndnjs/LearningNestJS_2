import { BadRequestException } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @Transform(({ value, obj }) => {
    if (obj.password.includes(value.trim())) {
      throw new BadRequestException(
        'password는 name과 같은 문자열을 포함할 수 없습니다.',
      );
    }

    return value.trim();
  })
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
