import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CardProduct } from '../../models';
import { FavouritesService } from '../../services';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavouritesComponent implements OnInit {
  public products$: Observable<CardProduct[]>;
  public productsNumber$: Observable<number>;

  constructor(
    private readonly favouritesService: FavouritesService
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
  }
}
