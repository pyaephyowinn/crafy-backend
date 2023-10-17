import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signIn({ email, password }: { email: string; password: string }) {
    const user = await this.usersService.findOneWithEmail(email);

    if (!user || user.password !== password) {
      throw new HttpException(
        'Email or password is incorrect',
        HttpStatus.BAD_REQUEST,
      );
    }

    return user;
  }
}
