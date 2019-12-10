import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';


import { CartItem, Cart } from '../models/cart.interface';
import { Product } from 'src/modules/product/product.interface';

@Injectable()
export class CartService {
  constructor(
    @InjectModel('Carts') private readonly cartModel: Model<Cart>,
    @InjectModel('Product') private readonly productModel: Model<Product>
  ) {}

  public async getUserCart(userId: string) {
    const userCart = await this.cartModel.findOne({userId});
    const responseCart: {userId, items} = {
      userId: userId,
      items: await this.getItemsWithPrice(userCart.items),
    };
    return userCart ? responseCart : {items: []};
  }

  public async updateUserCart(userId: string, items: CartItem[]) {
    console.log('updating cart items');
    console.log(items);
    const cart = await this.cartModel.findOne({userId});

    if (!cart) {
      const newCart = new this.cartModel({userId, items});
      return await newCart.save();
    }
    return await this.cartModel.findByIdAndUpdate(cart.id, { 
      userId: cart.userId,
      items: items,
    })
  }

  public async addItemsToUserCart(userId: string, newItems: CartItem[]) {
    const cart = await this.cartModel.findOne({userId});

    if (!cart) {
      const newCart = new this.cartModel({userId, newItems});
      return await newCart.save();
    }
    const oldItems = cart.items;
    return await this.cartModel.findByIdAndUpdate(cart.id, { 
      userId: cart.userId,
      items: this.mergeItems(oldItems, newItems),
    })
  }

  private mergeItems(oldItems: CartItem[], newItems: CartItem[]) {
    const merged = [...oldItems];
    for (const oldItem of oldItems) {
      const filtered = newItems.filter(newItem => 
        oldItem.id === newItem.id &&
        oldItem.color === newItem.color &&
        oldItem.size === newItem.size
      );
      if (filtered.length) {
        oldItem.quantity += filtered.reduce((acc, el: CartItem) => acc + el.quantity, 0);
      }
    }
    for (const newItem of newItems) {
      const filtered = oldItems.filter(oldItem => 
        oldItem.id === newItem.id &&
        oldItem.color === newItem.color &&
        oldItem.size === newItem.size
      );
      if (!filtered.length) {
        merged.push(newItem);
      }
    }
    return merged;
  }

  private async getItemsWithPrice(items: CartItem[]) {
    const result = [];
    for (const item of items) {
      const price = await this.productModel.findById(item.id);
      result.push({
        id: item.id,
        title: item.title, 
        size: item.size,
        color: item.color,
        quantity: item.quantity,
        image: item.image,
        price: price.price
      });
    }

    return result;
  }
}
