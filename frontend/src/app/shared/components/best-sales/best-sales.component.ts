import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Subscription, Subject } from 'rxjs';

import { ProductsService, CartService } from 'src/app/shared/services';
import { Product, CardProduct } from 'src/app/shared/models';
import { ProductResponse } from '../../models/product.response';

@Component({
  selector: 'app-best-sales',
  templateUrl: './best-sales.component.html',
  styleUrls: ['./best-sales.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BestSalesComponent implements OnInit, OnDestroy {
  public readonly products$ = new Subject<Product[]>();
  private subscription?: Subscription = undefined;

  constructor(
    private readonly productsService: ProductsService,
    private readonly cartService: CartService
  ) { }

  ngOnInit() {
    this.subscription = this.productsService.getProducts(0, 3).subscribe({
      next: (products: ProductResponse) => {
        this.subscription.unsubscribe();

        if (products && Array.isArray(products.data)) {
          this.products$.next(products.data);
        } else {
          throw 'incorrect data';
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }

  public readonly addProductToCart = (productInfo: CardProduct) => {
    this.cartService.addToCart(productInfo);
  }
}
