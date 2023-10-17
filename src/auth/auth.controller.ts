import {
  Body,
  Controller,
  Get,
  Post,
  Session,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { Serialize } from 'src/interceptors/Serialize.interceptor';
import { UsersService } from 'src/users/users.service';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUserInterceptor } from 'src/users/interceptors/current-interceptor';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Serialize(UserDto)
  @Post('signIn')
  async singIn(@Body() body: SignInDto, @Session() session: any) {
    const user = await this.authService.signIn(body);
    session.userId = user.id;
    return user;
  }

  @Post('signUp')
  async signUp(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Post('signOut')
  signOut(@Session() session: any) {
    session.userId = null;
    return { message: 'success' };
  }

  @UseInterceptors(CurrentUserInterceptor)
  @UseGuards(AuthGuard)
  @Get('me')
  @Serialize(UserDto)
  getMe(@CurrentUser() user: User) {
    return user;
  }
}
