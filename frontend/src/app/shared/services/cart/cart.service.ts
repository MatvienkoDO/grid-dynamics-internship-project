import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { CardProduct } from '../../models';
import { NotificationService } from '../notification/notification.service';
import { LocalizationService } from '../localization/localization.service';

const localStorageCartKey = 'CART_ITEMS';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public readonly items$: Observable<CardProduct[]>;

  private readonly items = new BehaviorSubject<CardProduct[]>([]);
  
  constructor(
    private readonly localizationService: LocalizationService,
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

  addToCart(cardProduct: CardProduct) {
    let updatedItems = null;
    const idx = this.indexOf(cardProduct);
    if (idx !== -1) {
      updatedItems = this.items.value;
      updatedItems[idx].quantity += cardProduct.quantity;
    } else {
      updatedItems = [
        ...this.items.value,
        cardProduct
      ];
    }

    this.saveItemsToLocalStorage(updatedItems);

    this.items.next(updatedItems);

    const message = this.localizationService.getNotificationServiceMessage('addToCart');
    this.notificationService.info(`${cardProduct.title} ${message}`);
  }

  private indexOf(cardProduct: CardProduct) {
    for (let i = 0; i < this.items.value.length; i++) {
      const item = this.items.value[i];
      if (item.id === cardProduct.id && item.color === cardProduct.color && item.size) {
        return i;
      }
    }
    return -1;
  }

  deleteFromCart(cardProduct: CardProduct) {
    const updatedItems = [
      ...this.items.value.filter(el => el.id !== cardProduct.id)
    ];

    this.saveItemsToLocalStorage(updatedItems);

    this.items.next(updatedItems);

    const message = this.localizationService.getNotificationServiceMessage('deleteFromCart');
    this.notificationService.warning(`${cardProduct.title} ${message}`);
  }

  clearCart() {
    const updatedItems = [];

    this.saveItemsToLocalStorage(updatedItems);

    this.items.next(updatedItems);

    const message = this.localizationService.getNotificationServiceMessage('clearCart');
    this.notificationService.warning(message);
  }

  private getItemsFromLocalStorage(): CardProduct[] | null {
    const localStorageData = localStorage.getItem(localStorageCartKey);

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
    localStorage.setItem(localStorageCartKey, JSON.stringify(items));
  }

  public readonly increaseQuantity = (index: number) => {
    const products = this.items.value;
    products[index].quantity++;
    this.items.next(products);
    this.saveItemsToLocalStorage(products);
  }

  public readonly decreaseQuantity = (index: number) => {
    const products = this.items.value;
    if (products[index].quantity > 1) {
      products[index].quantity--;
      this.items.next(products);
      this.saveItemsToLocalStorage(products);
    }
  }
}
