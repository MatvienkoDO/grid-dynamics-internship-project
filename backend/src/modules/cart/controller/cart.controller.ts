import * as express from 'express';
import { Controller, Put, Patch, Get, UseGuards, Body, Request } from '@nestjs/common';

import { CartService } from '../service/cart.service';
import { AuthGuard } from '../../../modules/authentication/guards/auth/auth.guard';
import { CartItem, PricedCartItem } from '../models/cart.interface';
import { userIdCookieKey } from '../../../shared/constants';

@Controller('api/cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
  ) {}

  @Patch()
  @UseGuards(AuthGuard)
  async addNewItems(@Request() request: express.Request, @Body() body: {newItems: CartItem[]}) {
    const userId = request.signedCookies[userIdCookieKey];
    return await this.cartService.addItemsToUserCart(userId, body.newItems);
  }

  @Put()
  @UseGuards(AuthGuard)
  async updateItems(@Request() request: express.Request, @Body() body: {items: CartItem[]}) {
    const userId = request.signedCookies[userIdCookieKey];
    return await this.cartService.updateUserCart(userId, body.items);
  }

  @Get()
  @UseGuards(AuthGuard)
  async getItems(@Request() request: express.Request) {
    const userId = request.signedCookies[userIdCookieKey];

    const items: PricedCartItem[] = await this.cartService.getUserCartItems(userId) ?? [];

    return {
      items,
    };
  }
}
