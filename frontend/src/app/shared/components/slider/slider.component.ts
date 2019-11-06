import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, share } from 'rxjs/operators';

import { ProductsService } from '../../services';
import { Product } from '../../models';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderComponent implements OnInit {
  public readonly current$ = new BehaviorSubject<number>(0);
  public currentProduct$: Observable<Product>;
  public products$: Observable<Product[]>;

  constructor(private readonly productsService: ProductsService) { }

  ngOnInit() {
    this.products$ = this.productsService.getProductsForSlider()
      .pipe(map(response => {
        if (response && Array.isArray(response.data)) {
          return response.data;
        }

        throw 'incorrect data';
      }))
      .pipe(share());

    this.currentProduct$ = combineLatest(this.current$, this.products$)
      .pipe(map(([slideNumber, products]) => products[slideNumber]));
  }

  public readonly changeSlide = (newCurrent: number) => {
    this.current$.next(newCurrent);
  }
}
