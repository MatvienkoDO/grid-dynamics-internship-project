import { Injectable, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { CardProduct } from '../models/card-product';
import { NotificationService } from './index';

const localStorageCartKey = 'CART_ITEMS';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public readonly items$: Observable<CardProduct[]>;

  private readonly items = new BehaviorSubject<CardProduct[]>([]);
  
  constructor(
    private readonly notificationService: NotificationService
  ) {
    this.items$ = this.items;
  }

  ngOnInit() {
    const itemsFromLocalStorage = this.getItemsFromLocalStorage();

    if (itemsFromLocalStorage) {
      this.items.next(itemsFromLocalStorage);
    }
  }

  addToCart(cardProduct: CardProduct) {
    const updatedItems = [
      ...this.items.value,
      cardProduct
    ];

    this.saveItemsToLocalStorage(updatedItems);

    this.items.next(updatedItems);

    this.notificationService.info(`${cardProduct.title} has been added`);
  }

  deleteFromCart(cardProduct: CardProduct) {
    const updatedItems = [
      ...this.items.value.filter(el => el.id !== cardProduct.id)
    ];

    this.saveItemsToLocalStorage(updatedItems);

    this.items.next(updatedItems);

    this.notificationService.warning(`${cardProduct.title} has been removed`);
  }

  clearCart() {
    const updatedItems = [];

    this.saveItemsToLocalStorage(updatedItems);

    this.items.next(updatedItems);

    this.notificationService.warning('Cart has been cleared');
  }

  private getItemsFromLocalStorage(): CardProduct[] | null {
    const localStorageData = localStorage.getItem(localStorageCartKey);

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
    localStorage.setItem(localStorageCartKey, JSON.stringify(items));
  }
}
