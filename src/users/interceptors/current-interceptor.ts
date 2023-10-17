import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersServices: UsersService) {}

  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session;

    if (!userId) {
      throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
    }

    const user = await this.usersServices.findOne(userId);

    if (!user) {
      throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
    }

    request.currentUser = user;

    return next.handle();
  }
}
