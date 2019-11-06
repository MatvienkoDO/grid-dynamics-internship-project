import { Product } from './product.interface'

export class ProductResponse {
  public data: Product | Product[];
  public quantity: number;
}
