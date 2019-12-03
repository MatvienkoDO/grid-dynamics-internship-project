import { CanActivate, ExecutionContext, Injectable, HttpException } from '@nestjs/common';
import { Request } from 'express';

import { userIdCookieKey } from '../../common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();

    if (request.signedCookies[userIdCookieKey]) {
      return true;
    }

    throw new HttpException({
      success: false,
      status: 'client_is_not_authorized',
    }, 401);
  }
}
