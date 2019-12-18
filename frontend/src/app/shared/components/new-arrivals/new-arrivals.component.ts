import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap, share, map } from 'rxjs/operators';

import {
  Product,
  CardProduct,
  ProductResponse
} from 'src/app/shared/models';

import {
  ProductsService,
  CartService,
  FavouritesService,
  NotificationService,
} from 'src/app/shared/services';

@Component({
  selector: 'app-new-arrivals',
  templateUrl: './new-arrivals.component.html',
  styleUrls: ['./new-arrivals.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewArrivalsComponent implements OnInit {
  public products$: Observable<Product[]>;
  public canLoadMore$: Observable<boolean>;

  private readonly productsNumbers = new BehaviorSubject<number>(4);

  constructor(
    private readonly productsService: ProductsService,
    private readonly cartService: CartService,
    private readonly favouritesService: FavouritesService,
    private readonly notificationService: NotificationService,
    private readonly router: Router,
  ) { }

  ngOnInit() {
    const productResponses: Observable<ProductResponse> = this.productsNumbers
      .pipe(switchMap(numberOfProducts =>
        this.productsService.getProducts(0, numberOfProducts)
      ))
      .pipe(share());

    this.products$ = productResponses.pipe(map(response => {
      if (response && Array.isArray(response.data)) {
        return response.data;
      }

      return [];
    }));

    this.canLoadMore$ = productResponses.pipe(map(response => {
      if (response && Array.isArray(response.data)) {
        const products = response.data;
        const quantity = Number(response.quantity);

        if (!isNaN(quantity) && isFinite(quantity)) {
          return products.length < quantity;
        }
      }

      return true;
    }));
  }

  public readonly loadMore = () => {
    this.productsNumbers.next(
      this.productsNumbers.value + 4
    );
  }

  public readonly goToPdp = (cardProduct: CardProduct) => {
    this.router.navigateByUrl(`/product/${cardProduct.id}`);
  }

  public addToCart(cardProduct: CardProduct) {
    this.cartService.addToCart(cardProduct);
  }

  public addToFavourites(cardProduct: CardProduct) {
    this.favouritesService.addToFavourites(cardProduct);
  }

  public readonly notChosen = (message: string) => {
    this.notificationService.warning(message);
  }
}
