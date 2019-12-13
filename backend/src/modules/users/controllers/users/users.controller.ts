import {
  Controller,
  Get,
  UseGuards,
  Request,
  Response,
  HttpStatus,
  Patch,
  Body,
} from '@nestjs/common';
import * as express from 'express';

import { AuthGuard } from '../../../authentication/guards/auth/auth.guard';
import { User } from '../../models/user';
import { userIdCookieKey } from '../../../../shared/constants';
import { UserService } from '../../services/user/user.service';
import { EditUserDto } from '../../models/edit-user.dto';

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
      response.status(HttpStatus.BAD_REQUEST);
      response.send({
        success: false,
        status: 'user_not_found',
      });
    }
  }

  @UseGuards(AuthGuard)
  @Patch()
  async editUser(
    @Body() userDto: EditUserDto,
    @Request() request: express.Request,
    @Response() response: express.Response,
  ) {
    const userId: string = request.signedCookies[userIdCookieKey];
    userDto.id = userId;
    const validateResult = await this.usersService.validate(userDto);
    if (validateResult.errors) {
      response.status(HttpStatus.BAD_REQUEST);
      response.send({
        success: false,
        status: 'invalid_edit_user_form',
        errors: validateResult.errors,
      });

      return;
    }

    return response.send({
      success: true,
      payload: validateResult.user,
    });
  }
}
