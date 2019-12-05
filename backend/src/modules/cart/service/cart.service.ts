import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';


import { CartItem, Cart } from '../models/cart.interface';

@Injectable()
export class CartService {
  constructor(
    @InjectModel('Carts') private readonly cartModel: Model<Cart>
  ) {}

  public async getUserCart(userId: string) {
    const userCart = await this.cartModel.findOne({userId});
    return userCart ? userCart : {items: []};
  }

  public async updateUserCart(userId: string, newItems: CartItem[]) {
    const cart = await this.cartModel.findOne({userId});

    if (!cart) {
      const newCart = new this.cartModel({userId, newItems});
      return await newCart.save();
    }
    const oldItems = cart.items;
    return this.cartModel.findByIdAndUpdate(cart.id, { 
      userId: cart.userId,
      items: this.mergeItems(oldItems, newItems),
    })
  }

  private mergeItems(oldItems: CartItem[], newItems: CartItem[]) {
    const merged = [...oldItems];
    return merged;
  }
}
