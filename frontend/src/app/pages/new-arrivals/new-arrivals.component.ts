import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap, share } from 'rxjs/operators';

import { Product } from 'src/app/shared/models';
import { ProductsService } from 'src/app/shared/services';

@Component({
  selector: 'app-new-arrivals',
  templateUrl: './new-arrivals.component.html',
  styleUrls: ['./new-arrivals.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewArrivalsComponent implements OnInit {
  public products$: Observable<Product[]>;
  private readonly productsNumbers = new BehaviorSubject<number>(4);

  constructor(private readonly productsService: ProductsService) { }

  ngOnInit() {
    this.products$ = this.productsNumbers
      .pipe(switchMap((numberOfProducts: number) => {
        return this.productsService.getProducts(0, numberOfProducts);
      }))
      .pipe(share());
  }

  public readonly loadMore = () => {
    this.productsNumbers.next(
      this.productsNumbers.value + 4
    );
  }
}
