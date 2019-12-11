import { LocalizedProduct } from './localizedProduct.model';

export class ProductResponse {

  constructor(
    public readonly data: LocalizedProduct | LocalizedProduct[],
    public readonly quantity?: number,
  ) { }
}
