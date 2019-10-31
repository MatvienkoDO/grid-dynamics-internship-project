import { Document } from 'mongoose';

export interface Product extends Document {
  name: string;
  description: string;
  category: string;
  brand: string;
  price: number;
  sizes: string[];
  colors: string[];
  images: string[];
}
