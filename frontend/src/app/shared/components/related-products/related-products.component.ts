import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product, CardProduct } from 'src/app/shared/models';
import { ProductsService, CartService, FavouritesService } from 'src/app/shared/services';

@Component({
  selector: 'app-related-products[id]',
  templateUrl: './related-products.component.html',
  styleUrls: ['./related-products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelatedProductsComponent implements OnInit {
  @Input('id') id: string;

  public products$: Observable<Product[]>;

  constructor(
    private readonly productsService: ProductsService,
    private readonly router: Router,
    private readonly cartService: CartService,
    private readonly favouritesService: FavouritesService,
  ) { }

  ngOnInit() {
    this.products$ = this.productsService.getRelatedProducts(this.id, 0, 4)
      .pipe(map(response => {
        if (response && Array.isArray(response.data)) {
          return response.data;
        }
        console.log(response);
        throw 'Product related incorrect data';
      }));
  }

  public readonly showDetails = (productId: string) => {
    this.router.navigateByUrl(`/product/${productId}`);
  }

  public readonly addToCart = (cardProduct: CardProduct) => {
    this.cartService.addToCart(cardProduct);
  }

  public readonly addToFavorite = (cardProduct: CardProduct) => {
    this.favouritesService.addToFavourites(cardProduct);
  }
}
