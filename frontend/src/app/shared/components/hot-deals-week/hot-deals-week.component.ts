import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';

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
  selector: 'app-hot-deals-week',
  templateUrl: './hot-deals-week.component.html',
  styleUrls: ['./hot-deals-week.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HotDealsWeekComponent implements OnInit, OnDestroy {

  public readonly products$ = new Subject<Product[]>();
  private subscription?: Subscription = undefined;

  constructor(
    private readonly productsService: ProductsService,
    private readonly cartService: CartService,
    private readonly favouritesService: FavouritesService,
    private readonly notificationService: NotificationService,
    private readonly router: Router,
  ) { }

  ngOnInit() {
    this.subscription = this.productsService.getProductsForMonth(0, 8).subscribe({
      next: (products: ProductResponse) => {
        if (this.subscription) {
          this.subscription.unsubscribe();
        }

        if (products && Array.isArray(products.data)) {
          this.products$.next(products.data);
        } else {
          throw new Error('incorrect data');
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
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
