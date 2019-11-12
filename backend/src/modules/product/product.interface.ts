import { Document } from 'mongoose';

export interface Product extends Document {
  id: string;
  name: {
      locale: string,
      value: string
  }[];
  subtitle: {
    locale: string,
    value: string
  }[];
  description: {
    locale: string,
    value: string
  }[];
  category: string;
  brand: string;
  price: number;
  sizes: string[];
  colors: string[];
  images: string[];
}
