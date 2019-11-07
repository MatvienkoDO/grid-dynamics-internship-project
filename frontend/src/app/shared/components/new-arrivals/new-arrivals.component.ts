import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap, share, map } from 'rxjs/operators';

import { Product } from 'src/app/shared/models';
import { ProductsService } from 'src/app/shared/services';
import { ProductResponse } from '../../models/product.response';

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

  constructor(private readonly productsService: ProductsService) { }

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

      throw 'incorrect data';
    }));

    this.canLoadMore$ = productResponses.pipe(map(response => {
      if (response && Array.isArray(response.data)) {
        const products = response.data;
        const quantity = Number(response.quantity);

        if (!isNaN(quantity) && isFinite(quantity)) {
          return products.length < quantity;
        }
      }

      throw 'incorrect data';
    }));
  }

  public readonly loadMore = () => {
    this.productsNumbers.next(
      this.productsNumbers.value + 4
    );
  }
}
