import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';

import { CartService } from '../../services';
import { CardProduct } from '../../models';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent implements OnInit {
  public productsNumber$: Observable<number>;

  constructor(
    private readonly cartService: CartService
  ) { }

  ngOnInit() {
    this.productsNumber$ = this.cartService.items$
      .pipe(map(products => products.length));
  }
}

@Component({
  selector: 'app-cart-inner',
  templateUrl: './cart-inner.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponentInner implements OnInit {
  public products$: Observable<CardProduct[]>;
  public productsNumber$: Observable<number>;
  public readonly quantity$ = new BehaviorSubject<number>(1);

  constructor(
    private readonly cartService: CartService,
    public dialogRef: MatDialogRef<CartComponentInner>,
  ) { }

  ngOnInit() {
    this.products$ = this.cartService.items$;
    this.productsNumber$ = this.cartService.items$
      .pipe(map(products => products.length));
  }

  deleteFromCart(cartProduct: CardProduct) {
    this.cartService.deleteFromCart(cartProduct);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public readonly increaseQuantity = () => {
    this.quantity$.next(
      this.quantity$.value + 1
    );
  }

  public readonly decreaseQuantity = () => {
    this.quantity$.next(
      Math.max(this.quantity$.value - 1, 1)
    );
  }

  getTotalCost() {
    return 1 //this.products$.map(t => t.price).reduce((acc, value) => acc + value, 0);
  }

}
