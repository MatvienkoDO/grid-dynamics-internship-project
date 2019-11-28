import { Controller, Post, Body, Response, Request, Get, UseGuards } from '@nestjs/common';
import * as express from 'express';

import { userIdCookieKey, userIdCookieOptions } from '../../common';
import { AuthGuard } from '../../guards/auth/auth.guard';

@Controller('api/auth')
export class AuthController {
  @Post('signup')
  signUp(@Body() body, @Request() request: express.Request) {
    // console.log(request.signedCookies);


    // TODO: call users service to create new user

    // TODO: make signing in here too this.signIn(body);
  }

  @Post('signin')
  async signIn(@Body() body, @Response() response: express.Response) {
    // TODO: use body for username and password hash retrieving

    const userId = 'qwerty'; // TODO: temporary value
    
    response.cookie(userIdCookieKey, userId, userIdCookieOptions);
    response.type('application/json');
    response.send({ status: 'ok', success: true });
  }

  @Get('check')
  check(
    @Request() request: express.Request,
    @Response() response: express.Response,
  ) {
    const result = !!request.signedCookies[userIdCookieKey];

    response.send({
      success: true,
      result,
    });
  }

  @Get('user-is-authenticated')
  @UseGuards(AuthGuard)
  checkForAuthentication(@Response() response: express.Response) {
    response.send({
      success: true,
    });
  }
}
