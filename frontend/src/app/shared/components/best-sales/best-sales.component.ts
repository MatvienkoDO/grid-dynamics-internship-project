import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Subscription, Subject } from 'rxjs';

import { ProductsService } from 'src/app/shared/services';
import { Product } from 'src/app/shared/models';
import { CardProduct } from 'src/app/shared/models/card-product';

@Component({
  selector: 'app-best-sales',
  templateUrl: './best-sales.component.html',
  styleUrls: ['./best-sales.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BestSalesComponent implements OnInit, OnDestroy {
  public readonly products$ = new Subject<Product[]>();
  private subscription?: Subscription = undefined;

  constructor(private readonly productsService: ProductsService) { }

  ngOnInit() {
    this.subscription = this.productsService.getProducts(0, 3).subscribe({
      next: (products: Product[]) => {
        this.subscription.unsubscribe();
        this.products$.next(products);
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }

  public readonly addProductToCart = (productInfo: CardProduct) => {
    // TODO: realize addition to cart
    alert(`It is not realized yet. Product id: ${productInfo.id}`);
  }
}
