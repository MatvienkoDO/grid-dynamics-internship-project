import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

const localStorageCartKey = 'LOCALE';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {
  private readonly locale = new BehaviorSubject<string>("en");

  constructor(
    private readonly translate: TranslateService
  ) {
    this.translate.addLangs(['en', 'ru']);
    this.translate.setDefaultLang('en');
    this.init();
    this.translate.use(this.locale.getValue());
  }

  private init() {
    const localeFromLocalStorage = this.getLocaleFromLocalStorage();

    if (localeFromLocalStorage) {
      this.translate.use(localeFromLocalStorage);
      this.locale.next(localeFromLocalStorage);
    }
  }

  private getLocaleFromLocalStorage() {
    return localStorage.getItem(localStorageCartKey);
  }

  private saveLocaleToLocalStorage(): void {
    localStorage.setItem(localStorageCartKey, this.locale.getValue());
  }

  public getLangs() {
    return this.translate.getLangs();
  }

  public getLocale() {
    return this.locale.getValue();
  }

  public setLocale(newLocale: string) {
    this.translate.use(newLocale);
    this.locale.next(newLocale);
    this.saveLocaleToLocalStorage();
    location.reload();
  }

  public getNotificationServiceMessage(type: string) {
    return notificationServiceMessages[type][this.locale.getValue()];
  }
}

const notificationServiceMessages = {
  addToCart: {
    en: 'has been added',
    ru: 'в корзине'
  },
  deleteFromCart: {
    en: 'has been removed',
    ru: 'удален из корзины'
  },
  clearCart: {
    en: 'Cart has been cleared',
    ru: 'Корзина очищена'
  },
  addToFavourites: {
    en: 'has been added to Favourites',
    ru: 'добавлен в избранное'
  },
  deleteFromFavourites: {
    en: 'has been removed from Favourites',
    ru: 'удален из избранного'
  },
  clearFavourites: {
    en: 'Favourites has been cleared',
    ru: 'Список избранного очищен'
  }
};