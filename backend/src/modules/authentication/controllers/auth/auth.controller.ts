import { Controller, Post, Body, Response, Request } from '@nestjs/common';
import * as express from 'express';

import { userIdCookieKey, userIdCookieOptions } from '../../common';
import { UserService } from '../../services/user/user.service';
import { UserLoginDto } from '../../models/dto/UserLogin.dto';
import { UserSignupDto } from '../../models/dto/UserSignup.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signUp(@Body() body: UserSignupDto, @Response() response: express.Response) {
    const isValid = await this.userService.isValidSignupDto(body);
    if (body && !isValid) {
      response.status(401);
      response.send({ status: 'error', message: 'Invalid form' });
    }
    const isUnique = await this.userService.isUnique(body);
    if (!isUnique) {
      response.status(401);
      response.send({ status: 'error', message: 'Email is not unique' });
    }

    const newUser = await this.userService.createUser(body);
    response.cookie(userIdCookieKey, newUser.password, userIdCookieOptions);
    response.type('application/json');
    response.send({
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      role: newUser.role
    });
  }

  @Post('login')
  async login(@Body() body: UserLoginDto, @Response() response: express.Response) {
    const isValid = await this.userService.isValidLoginDto(body);
    if (body && !isValid) {
      response.status(401);
      response.send({ status: 'error', message: 'Invalid email/password' });
    }
    const user = await this.userService.findBy(body);
    
    response.cookie(userIdCookieKey, user.password, userIdCookieOptions);
    response.type('application/json');
    response.send({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role
    });
  }

  @Post('logout') 
  async logout(@Response() response: express.Response) {
    response.clearCookie(userIdCookieKey);
    response.send();
  }
}
