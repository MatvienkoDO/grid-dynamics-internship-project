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
  styleUrls: ['./cart.component.scss']
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
  public totalCost$: Observable<number>;
  public readonly quantity$ = new BehaviorSubject<number>(1);

  constructor(
    public readonly dialogRef: MatDialogRef<CartComponentInner>,
    private readonly cartService: CartService,
  ) { }

  ngOnInit() {
    this.products$ = this.cartService.items$;
    this.productsNumber$ = this.cartService.items$
      .pipe(map(products => products.length));

    this.totalCost$ = this.products$.pipe(map(products => {
      return products
        .reduce(
          (acc, current) => acc + current.price * current.quantity,
          0
        );
    }));
  }

  deleteFromCart(cartProduct: CardProduct) {
    this.cartService.deleteFromCart(cartProduct);
  }

  clearCart() {
    this.cartService.clearCart();
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public readonly increaseQuantity = (index: number) => {
    this.cartService.increaseQuantity(index);
  }

  public readonly decreaseQuantity = (index: number) => {
    this.cartService.decreaseQuantity(index);
  }
}
