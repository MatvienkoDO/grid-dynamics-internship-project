import {
  Controller,
  Post,
  Body,
  Response,
  Request,
  Get,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import * as express from 'express';

import { userIdCookieKey, userIdCookieOptions } from '../../../../shared/constants';
import { AuthGuard } from '../../guards/auth/auth.guard';
import { UserService } from '../../services/user/user.service';
import { UserLoginDto } from '../../models/dto/UserLogin.dto';
import { UserSignupDto } from '../../models/dto/UserSignup.dto';
import { UserDocument } from '../../models/user-document.interface';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signUp(@Body() body: UserSignupDto, @Response() response: express.Response) {
    const isValid = await this.userService.isValidSignupDto(body);
    if (body && !isValid) {
      response.status(HttpStatus.BAD_REQUEST);
      response.type('application/json');
      response.send({
        success: false,
        status: 'signup_invalid_form',
        message: 'Invalid form',
      });

      return;
    }
    const isUnique = await this.userService.isUnique(body);
    if (!isUnique) {
      response.status(HttpStatus.BAD_REQUEST);
      response.type('application/json');
      response.send({
        success: false,
        status: 'email_is_not_unique',
        message: 'Email is not unique',
      });

      return;
    }

    const newUser = await this.userService.createUser(body);
    response.cookie(userIdCookieKey, newUser.id, userIdCookieOptions);
    response.type('application/json');

    return response.send({
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      role: newUser.role,
    });
  }

  @Post('login')
  async login(@Body() body: UserLoginDto, @Response() response: express.Response) {
    const user: UserDocument | undefined = await this.userService
      .getUserByLoginPassword(body.email, body.password);

    if (!user) {
      response.status(HttpStatus.BAD_REQUEST);
      response.send({
        success: false,
        status: 'incorrect_login_password_pair',
        message: 'Invalid email/password',
      });

      return;
    }

    response.cookie(userIdCookieKey, user.id, userIdCookieOptions);
    response.type('application/json');
    response.send({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      locale: user.locale,
    });

    return;
  }

  @Post('logout')
  async logout(@Response() response: express.Response) {
    response.clearCookie(userIdCookieKey);
    response.status(HttpStatus.OK);
    response.send({
      success: true,
      status: 'ok',
      message: 'ok',
    });

    return;
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
