import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Favourite, FavouriteItem } from '../../models/favourite.interface';
import { Product } from 'src/modules/product/product.interface';


@Injectable()
export class FavouriteService {
  constructor(
    @InjectModel('Favourites') private readonly favouriteModel: Model<Favourite>,
    @InjectModel('Product') private readonly productModel: Model<Product>
  ) {}

  public async getUserFavourites(userId: string) {
    const userFavourites = await this.favouriteModel.findOne({userId});
    if (userFavourites) {
      const responseCart: {userId, items} = {
        userId: userId,
        items: await this.getItemsWithPrice(userFavourites.items),
      };
      return responseCart;
    }
    return {items: []};
  }

  public async updateUserFavourites(userId: string, items: FavouriteItem[]) {
    const favourites = await this.favouriteModel.findOne({userId});

    if (!favourites) {
      const newFavourites = new this.favouriteModel({userId, items});
      return await newFavourites.save();
    }
    return await this.favouriteModel.findByIdAndUpdate(favourites.id, { 
      userId: favourites.userId,
      items: items,
    })
  }

  public async addItemsToUserFavourites(userId: string, newItems: FavouriteItem[]) {
    const favourites = await this.favouriteModel.findOne({userId});

    if (!favourites) {
      const newCart = new this.favouriteModel({userId, newItems});
      return await newCart.save();
    }
    const oldItems = favourites.items;
    return await this.favouriteModel.findByIdAndUpdate(favourites.id, { 
      userId: favourites.userId,
      items: this.mergeItems(oldItems, newItems),
    })
  }

  private mergeItems(oldItems: FavouriteItem[], newItems: FavouriteItem[]) {
    const merged = [...oldItems];
    for (const oldItem of oldItems) {
      const filtered = newItems.filter(newItem => 
        oldItem.id === newItem.id &&
        oldItem.color === newItem.color &&
        oldItem.size === newItem.size
      );
      if (filtered.length) {
        oldItem.quantity += filtered.reduce((acc, el: FavouriteItem) => acc + el.quantity, 0);
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

  private async getItemsWithPrice(items: FavouriteItem[]) {
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
