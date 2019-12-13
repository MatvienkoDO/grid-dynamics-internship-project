import { Document } from "mongoose";

import { Image } from "src/modules/product/localizedProduct.model";

export interface FavouriteItem {
  id: string,
  title: string,
  size: string,
  color: string,
  quantity: number,
  image: Image,
}

export interface Favourite extends Document {
  userId: string,
  items: FavouriteItem[],
}