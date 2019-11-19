import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { map, share, switchMap } from 'rxjs/operators';

import {
  Product,
  CardProduct
} from 'src/app/shared/models';

import {
  ProductsService,
  FavouritesService,
  CartService,
} from 'src/app/shared/services';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsComponent implements OnInit {
  public product$: Observable<Product>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly productsService: ProductsService,
    private readonly cartService: CartService,
    private readonly favouritesService: FavouritesService
  ) { }

  ngOnInit() {
    this.product$ = this.route.params
      .pipe(switchMap((params: Params) => {
        const id: string = params['id'];

        return this.productsService.getProductById(id)
          .pipe(map(response => {
            if (response && !Array.isArray(response.data)) {
              return response.data;
            }
            console.log(response);
            throw 'product details incorrect data';
          }));
      }), share());
  }

  public addToCart(cardProduct: CardProduct) {
    this.cartService.addToCart(cardProduct);
  }

  public addToFavourites(cardProduct: CardProduct) {
    this.favouritesService.addToFavourites(cardProduct);
  }
}
