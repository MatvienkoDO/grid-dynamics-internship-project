import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { CardProduct } from '../../models';
import { NotificationService } from '../notification/notification.service';

const localStorageFavouritesKey = 'FAVOURITES_ITEMS';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {
  public readonly items$: Observable<CardProduct[]>;
  private readonly items = new BehaviorSubject<CardProduct[]>([]);

  constructor(
    private readonly notificationService: NotificationService
  ) { 
    this.items$ = this.items;
    this.init();
  }

  init() {
    const itemsFromLocalStorage = this.getItemsFromLocalStorage();

    if (itemsFromLocalStorage) {
      this.items.next(itemsFromLocalStorage);
    }
  }

  addToFavourites(cardProduct: CardProduct) {
    let updatedItems = null;
    const idx = this.indexOf(cardProduct);
    if (idx === -1) {
      updatedItems = [
        ...this.items.value,
        cardProduct
      ];

      this.saveItemsToLocalStorage(updatedItems);

      this.items.next(updatedItems);

      this.notificationService.info(`${cardProduct.title} has been added to Favourites`);
    }
  }

  private indexOf(cardProduct: CardProduct) {
    for (let i = 0; i < this.items.value.length; i++) {
      const item = this.items.value[i];
      if (item.id === cardProduct.id) {
        return i;
      }
    }
    return -1;
  }

  deleteFromFavourites(product: CardProduct) {
    const updatedItems = [
      ...this.items.value.filter(el => el.id !== product.id)
    ];

    this.saveItemsToLocalStorage(updatedItems);

    this.items.next(updatedItems);

    this.notificationService.warning(`${product.title} has been removed from Favourites`);
  }

  clearFavourites() {
    const updatedItems = [];

    this.saveItemsToLocalStorage(updatedItems);

    this.items.next(updatedItems);

    this.notificationService.warning('Favourites has been cleared');
  }

  private getItemsFromLocalStorage(): CardProduct[] | null {
    const localStorageData = localStorage.getItem(localStorageFavouritesKey);

    try {
      const data = JSON.parse(localStorageData);

      if (Array.isArray(data)) {
        return data;
      }
    } catch (e) {
      return null;
    }

    return null;
  }

  private saveItemsToLocalStorage(items: CardProduct[]): void {
    localStorage.setItem(localStorageFavouritesKey, JSON.stringify(items));
  }
}
