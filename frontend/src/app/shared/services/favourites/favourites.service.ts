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
    this.items$ = this.items;
    this.init();
  }

  init() {
    const itemsFromLocalStorage = this.getItemsFromLocalStorage();

    if (itemsFromLocalStorage) {
      this.items.next(itemsFromLocalStorage);
    }
  }

  addToFavourites(product: CardProduct) {
    const updatedItems = [
      ...this.items.value,
      product
    ];

    this.saveItemsToLocalStorage(updatedItems);

    this.items.next(updatedItems);

    const message = this.localizationService.getNotificationServiceMessage('addToFavourites');
    this.notificationService.info(`${product.title} ${message}`);
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
