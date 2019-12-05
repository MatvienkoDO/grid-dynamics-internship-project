import { Document } from "mongoose";

export interface CartItem {
  productId: string,
  size: string,
  color: string,
  price: string,
  quantity: number
}

export interface Cart extends Document {
  userId: string,
  items: CartItem[],
}