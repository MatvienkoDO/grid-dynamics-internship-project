import { Controller, Patch, UseGuards, Request, Body, Put, Get } from '@nestjs/common';
import * as express from 'express';

import { FavouriteService } from '../../service/favourite/favourite.service';
import { AuthGuard } from '../../../../modules/authentication/guards/auth/auth.guard';
import { FavouriteItem } from '../../models/favourite.interface';
import { userIdCookieKey } from '../../../../shared/constants';

@Controller('api/favourites')
export class FavouriteController {
  constructor(
    private readonly favouriteService: FavouriteService,
  ) {}

  @Patch()
  @UseGuards(AuthGuard)
  async addNewItems(@Request() request: express.Request, @Body() body: {newItems: FavouriteItem[]}) {
    const userId = request.signedCookies[userIdCookieKey];
    return await this.favouriteService.addItemsToUserFavourites(userId, body.newItems);
  }

  @Put()
  @UseGuards(AuthGuard)
  async updateItems(@Request() request: express.Request, @Body() body: {items: FavouriteItem[]}) {
    const userId = request.signedCookies[userIdCookieKey];
    return await this.favouriteService.updateUserFavourites(userId, body.items);
  }

  @Get()
  @UseGuards(AuthGuard)
  async getItems(@Request() request: express.Request) {
    const userId = request.signedCookies[userIdCookieKey];
    return await this.favouriteService.getUserFavourites(userId);
  }
}
