import { Controller, Get, UseGuards, Request, Response } from '@nestjs/common';
import * as express from 'express';

import { AuthGuard } from '../../../authentication/guards/auth/auth.guard';
import { User } from '../../models/user';
import { userIdCookieKey } from '../../../../shared/constants';
import { UserService } from '../../services/user/user.service'

@Controller('api/users')
export class UsersController {

  constructor(
    private readonly usersService: UserService,
  ) { }

  @UseGuards(AuthGuard)
  @Get('me')
  async getMe(
    @Request() request: express.Request,
    @Response() response: express.Response,
  ) {
    // can assure here, because AuthGuard checks
    const userId: string = request.signedCookies[userIdCookieKey];

    const user: User | null = await this.usersService.findById(userId);

    if (user) {
      response.send({
        success: true,
        payload: user,
      });
    } else {
      response.clearCookie(userIdCookieKey);
      response.status(400);
      response.send({
        success: false,
        status: 'user_not_found',
      });
    }
  }

}
