import { Document } from "mongoose";
import { Image } from "src/modules/product/localizedProduct.model";

export interface CartItem {
  id: string,
  title: string,
  size: string,
  color: string,
  quantity: number,
  image: Image,
}

export interface Cart extends Document {
  userId: string,
  items: CartItem[],
}