import { CanActivate, ExecutionContext, Injectable, HttpException } from '@nestjs/common';
import { Request } from 'express';

import { userIdCookieKey, unauthenticatedStatus } from '../../../../shared/constants';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();

    if (request.signedCookies[userIdCookieKey]) {
      return true;
    }

    throw new HttpException({
      success: false,
      status: unauthenticatedStatus,
    }, 401);
  }
}
