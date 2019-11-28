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
  images: Image[];
  sliderImage?: string;
}

export interface Image {
  "1_1": string,
  "4_3": string,
  "16_9": string,
  "scale": string,
  "default": string
}
