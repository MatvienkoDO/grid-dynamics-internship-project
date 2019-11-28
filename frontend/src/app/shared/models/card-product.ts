import { Image } from './product';

export interface CardProduct {
  id: string;
  title: string;
  quantity: number;
  price: number;
  image: Image;
  size?: string;
  color?: string;
}
