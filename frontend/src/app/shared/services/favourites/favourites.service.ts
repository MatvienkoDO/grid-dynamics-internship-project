import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { CardProduct } from '../../models';
import { NotificationService } from '../notification/notification.service';
import { LocalizationService } from '../localization/localization.service';

const localStorageFavouritesKey = 'FAVOURITES_ITEMS';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {
  public readonly items$: Observable<CardProduct[]>;
  private readonly items = new BehaviorSubject<CardProduct[]>([]);

  constructor(
    private readonly notificationService: NotificationService,
    private readonly localizationService: LocalizationService,
  ) { 
    this.items$ = this.items.asObservable();
    this.init();
  }

  private init() {
    const itemsFromLocalStorage = this.getItemsFromLocalStorage();

    if (itemsFromLocalStorage) {
      this.items.next(itemsFromLocalStorage);
    }
  }

  addToFavourites(cardProduct: CardProduct) {
    const idx = this.indexOf(cardProduct);

    if (idx === -1) {
      const updatedItems = [
        ...this.items.value,
        cardProduct
      ];

      this.saveItemsToLocalStorage(updatedItems);

      this.items.next(updatedItems);

      const message = this.localizationService.getNotificationServiceMessage('addToFavourites');
      this.notificationService.info(`${cardProduct.title} ${message}`);
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

    const message = this.localizationService.getNotificationServiceMessage('deleteFromFavourites');
    this.notificationService.warning(`${product.title} ${message}`);
  }

  clearFavourites() {
    const updatedItems = [];

    this.saveItemsToLocalStorage(updatedItems);

    this.items.next(updatedItems);

    const message = this.localizationService.getNotificationServiceMessage('clearFavourites');
    this.notificationService.warning(message);
  }

  private getItemsFromLocalStorage(): CardProduct[] | null {
    const localStorageData = localStorage.getItem(localStorageFavouritesKey);

    if (!localStorageData) {
      return null;
    }

    try {
      const data = JSON.parse(localStorageData);

      if (Array.isArray(data)) {
        return data;
      }
    } catch (e) { }

    return null;
  }

  private saveItemsToLocalStorage(items: CardProduct[]): void {
    localStorage.setItem(localStorageFavouritesKey, JSON.stringify(items));
  }
}
