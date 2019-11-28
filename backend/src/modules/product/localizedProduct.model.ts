export class LocalizedProduct {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  category: string;
  brand: string;
  price: number;
  sizes: string[];
  colors: string[];
  images: Image[];
  sliderImage?: string;

  constructor(
    id: string,
    name: string,
    subtitle: string,
    description: string,
    category: string,
    brand: string,
    price: number,
    sizes: string[],
    colors: string[],
    images: Image[],
    sliderImage?: string
  ) {
    this.id = id;
    this.name = name;
    this.subtitle = subtitle;
    this.description = description;
    this.category = category;
    this.brand = brand;
    this.price = price;
    this.sizes = sizes;
    this.colors = colors;
    this.images = images;
    this.sliderImage = sliderImage;
  }
}

export interface Image {
  "1_1": string,
  "4_3": string,
  "16_9": string,
  "scale": string,
  "default": string
}
