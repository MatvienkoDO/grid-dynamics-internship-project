import { Injectable, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { CardProduct } from '../models/card-product';

const localStorageCartKey = 'CART_ITEMS';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public items$: Observable<CardProduct[]>;

  private items: BehaviorSubject<CardProduct[]>;
  
  constructor() {}

  ngOnInit() {
    const itemsFromLocalStorage = this.getItemsFromLocalStorage();
    const items = itemsFromLocalStorage || [];

    this.items = new BehaviorSubject(items);
    this.items$ = this.items;
  }

  addToCart(cardProduct: CardProduct) {
    const updatedItems = [
      ...this.items.value,
      cardProduct
    ];

    this.saveItemsToLocalStorage(updatedItems);

    this.items.next(updatedItems);
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
