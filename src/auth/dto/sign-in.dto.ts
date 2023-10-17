import { IsEmail, IsString, MinLength } from 'class-validator';
import { MIN_USER_PASSWORD_LENGTH } from 'src/constants/validation-values';

export class SignInDto {
  @IsEmail({}, { message: 'email must be a valid email' })
  email: string;

  @MinLength(MIN_USER_PASSWORD_LENGTH, {
    message: `password must be at least ${MIN_USER_PASSWORD_LENGTH} characters`,
  })
  password: string;
}
