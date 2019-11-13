export interface Product {
  id: string;
  name: string;
  description: string;
  subtitle: string;
  category: string;
  brand: string;
  price: number;
  sizes: string[];
  colors: string[];
  images: string[];
  sliderImage?: string;
}
