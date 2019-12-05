import * as express from 'express';
import { Controller, Put, Get, UseGuards, Body, Request } from '@nestjs/common';

import { CartService } from '../service/cart.service';
import { AuthGuard } from 'src/modules/authentication/guards/auth/auth.guard';
import { CartItem } from '../models/cart.interface';
import { userIdCookieKey } from '../../../shared/constants';

@Controller('api/cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
  ) {}

  @Put()
  @UseGuards(AuthGuard)
  async create(@Request() request: express.Request, @Body() body: {newItems: CartItem[]}) {
    const userId = request.signedCookies[userIdCookieKey];
    return await this.cartService.updateUserCart(userId, body.newItems);
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll(@Request() request: express.Request) {
    const userId = request.signedCookies[userIdCookieKey];
    return await this.cartService.getUserCart(userId);
  }
}
