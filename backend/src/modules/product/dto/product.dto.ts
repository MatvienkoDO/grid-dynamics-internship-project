export class ProductDto {

  constructor(
    readonly name: string,
    readonly description: string,
    readonly category: string,
    readonly brand: string,
    readonly price: number,
    readonly sizes: string[],
    readonly colors: string[],
    readonly images: string[],
  ) { }
}
