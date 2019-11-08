import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CartService } from '../../services';
import { CardProduct } from '../../models';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent implements OnInit {
  public products$: Observable<CardProduct[]>;
  public productsNumber$: Observable<number>;

  constructor(
    private readonly cartService: CartService
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
}
