import { Controller, Post, Body, Response, Request } from '@nestjs/common';
import * as express from 'express';

import { userIdCookieKey, userIdCookieOptions } from '../../common';

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
}
