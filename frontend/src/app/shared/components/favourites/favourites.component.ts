import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';

import { FavouritesService, CartService } from '../../services';
import { CardProduct } from '../../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavouritesComponent implements OnInit {
  public productsNumber$: Observable<number>;

  constructor(
    private readonly favouritesService: FavouritesService
  ) { }

  ngOnInit() {
    this.productsNumber$ = this.favouritesService.items$
      .pipe(map(products => products.length));
  }

}
@Component({
  selector: 'favourites-inner',
  templateUrl: './favourites-inner.component.html',
  styleUrls: ['./favourites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavouritesComponentInner implements OnInit {
  public products$: Observable<CardProduct[]>;
  public productsNumber$: Observable<number>;

  constructor(
    private readonly favouritesService: FavouritesService,
    public dialogRef: MatDialogRef<FavouritesComponentInner>,
    private readonly router: Router,
    private readonly cartService: CartService,
  ) { }

  ngOnInit() {
    this.products$ = this.favouritesService.items$;
    this.productsNumber$ = this.favouritesService.items$
      .pipe(map(products => products.length));
  }

  deleteFromFavourites(product: CardProduct) {
    this.favouritesService.deleteFromFavourites(product);
  }

  clearCart() {
    this.favouritesService.clearFavourites();
    this.dialogRef.close();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  toPdp(id: string) {
    this.router.navigateByUrl(`/product/${id}`);
    this.dialogRef.close();
  }

  addToCartFromFav(cardProduct: CardProduct) {
    this.cartService.addToCart(cardProduct);
  }
}