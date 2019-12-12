import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';

import { ProductsService, CartService } from 'src/app/shared/services';
import { Product, CardProduct, ProductResponse } from 'src/app/shared/models';

@Component({
  selector: 'app-best-sales',
  templateUrl: './best-sales.component.html',
  styleUrls: ['./best-sales.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class BestSalesComponent implements OnInit, OnDestroy {
  public readonly products$ = new Subject<Product[]>();
  private subscription?: Subscription = undefined;

  constructor(
    private readonly productsService: ProductsService,
    private readonly cartService: CartService,
    private readonly router: Router,
    
  ) { }

  ngOnInit() {
    this.subscription = this.productsService.getProducts(0, 3).subscribe({
      next: (products: ProductResponse) => {
        if (this.subscription) {
          this.subscription.unsubscribe();
        }

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

  public readonly showDetails = (productInfo: CardProduct) => {
    this.router.navigateByUrl(`/product/${productInfo.id}`);
  }

  public readonly addProductToCart = (productInfo: CardProduct) => {
    this.cartService.addToCart(productInfo);
  }
}
