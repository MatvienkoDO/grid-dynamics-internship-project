import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, Subscription, interval } from 'rxjs';
import { map, share } from 'rxjs/operators';

import { ProductsService, CartService } from '../../services';
import { Product } from '../../models';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderComponent implements OnInit, OnDestroy {
  public readonly current$ = new BehaviorSubject<number>(0);
  public currentProduct$: Observable<Product>;
  public products$: Observable<Product[]>;

  private productChangerSubscription: Subscription;

  constructor(
    private readonly productsService: ProductsService,
    private readonly cartService: CartService  
  ) { }

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

    this.productChangerSubscription = combineLatest(interval(7000), this.products$)
      .pipe(map(([_, products]) => products ? products.length : 0))
      .subscribe(productsNumber => {
        const possibleNext = this.current$.value + 1;

        const next = possibleNext < productsNumber
          ? possibleNext
          : 0;

        this.current$.next(next);
      });
  }

  ngOnDestroy() {
    this.productChangerSubscription.unsubscribe();
  }

  public readonly changeSlide = (newCurrent: number) => {
    this.current$.next(newCurrent);
  }

  public readonly orderProduct = (productId: string, productTitle: string) => {
    this.cartService.addToCart({
      id: productId,
      title: productTitle
    });
  }
}
