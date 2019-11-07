export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  price: number;
  sizes: string[];
  colors: string[];
  images: string[];
  sliderImage?: string;
}
