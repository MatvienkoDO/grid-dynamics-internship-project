import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { CartItem, Cart, PricedCartItem } from '../models/cart.interface';
import { Product } from 'src/modules/product/product.interface';
import { innerJoin, Pairs } from '../../../shared/utils';

@Injectable()
export class CartService {
  constructor(
    @InjectModel('Carts') private readonly cartModel: Model<Cart>,
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  public async getUserCartItems(userId: string): Promise<PricedCartItem[] | null> {
    const userCart = await this.cartModel.findOne({ userId });
    if (!userCart) {
      return null;
    }

    return this.getPricedItems(userCart.items);
  }

  public async updateUserCart(userId: string, items: CartItem[]) {
    const cart = await this.cartModel.findOne({userId});

    if (!cart) {
      const newCart = new this.cartModel({userId, items});

      return newCart.save();
    }

    const update = {
      userId: cart.userId,
      items,
    };

    return this.cartModel.findByIdAndUpdate(cart.id, update).exec();
  }

  public async addItemsToUserCart(userId: string, newItems: CartItem[]) {
    const cart = await this.cartModel.findOne({userId});

    if (!cart) {
      const newCart = new this.cartModel({userId, newItems});

      return newCart.save();
    }
    const oldItems = cart.items;

    const update = {
      userId: cart.userId,
      items: this.mergeItems(oldItems, newItems),
    };

    return this.cartModel.findByIdAndUpdate(cart.id, update).exec();
  }

  private mergeItems(oldItems: CartItem[], newItems: CartItem[]) {
    const merged = [...oldItems];
    for (const oldItem of oldItems) {
      const filtered = newItems.filter(newItem =>
        oldItem.id === newItem.id &&
        oldItem.color === newItem.color &&
        oldItem.size === newItem.size,
      );
      if (filtered.length) {
        oldItem.quantity += filtered.reduce((acc, el: CartItem) => acc + el.quantity, 0);
      }
    }
    for (const newItem of newItems) {
      const filtered = oldItems.filter(oldItem =>
        oldItem.id === newItem.id &&
        oldItem.color === newItem.color &&
        oldItem.size === newItem.size,
      );
      if (!filtered.length) {
        merged.push(newItem);
      }
    }

    return merged;
  }

  private async getPricedItems(items: CartItem[]): Promise<PricedCartItem[]> {
    const itemsIds = items.map(({ id }) => id);

    const conditions = {
      id: {
        $in: itemsIds,
      },
    };
    const products = await this.productModel.find(conditions);

    const itemProductPairs: Pairs<CartItem, Product> = innerJoin(
      items,
      products,
      (item, product) => item.id === product.id,
    );

    const priced: PricedCartItem[] = itemProductPairs.map(([item, product]) => ({
      ...item,
      price: product.price,
    }));

    return priced;
  }
}
