import { Injectable } from '@angular/core';

import { CardProduct } from '../models/card-product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  static readonly localStorageKey = 'cartItems';
  items: CardProduct[] = [];
  constructor() {}

  addToCart(cardProduct: CardProduct) {
    this.items.push(cardProduct);
    localStorage.setItem(CartService.localStorageKey, JSON.stringify(this.items));
    console.log(this.getItems());
  }

  getItems() {
    return JSON.parse(localStorage.getItem(CartService.localStorageKey));
  }

  clearCart() {
    this.items = [];
    localStorage.removeItem(CartService.localStorageKey);
    return this.items;
  }
}