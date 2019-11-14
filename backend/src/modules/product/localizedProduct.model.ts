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
  images: string[];
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
    images: string[],
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
