import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import {
  MIN_USER_NAME_LENGTH,
  MAX_USER_NAME_LENGTH,
  MIN_USER_PASSWORD_LENGTH,
} from 'src/constants/validation-values';

export class CreateUserDto {
  @MinLength(MIN_USER_NAME_LENGTH, {
    message: `username must be at least ${MIN_USER_NAME_LENGTH} characters`,
  })
  @MaxLength(MAX_USER_NAME_LENGTH, {
    message: `username must be at most ${MAX_USER_NAME_LENGTH} characters`,
  })
  @IsString({ message: 'username must be a string' })
  username: string;

  @IsEmail({}, { message: 'email must be a valid email' })
  email: string;

  @IsString({ message: 'password must be a string' })
  @MinLength(MIN_USER_PASSWORD_LENGTH, {
    message: `password must be at least ${MIN_USER_PASSWORD_LENGTH} characters`,
  })
  password: string;
}
