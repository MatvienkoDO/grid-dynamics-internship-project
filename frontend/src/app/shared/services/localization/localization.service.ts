import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, BehaviorSubject } from 'rxjs';

const localStorageCartKey = 'LOCALE';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {
  public readonly locale$: Observable<string>;
  private readonly locale = new BehaviorSubject<string>("en");

  constructor(
    private readonly translate: TranslateService
  ) {
    this.locale$ = this.locale;
    this.translate.addLangs(['en', 'ru']);
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|ru/) ? browserLang : 'en');
    this.init();
  }

  private init() {
    const localeFromLocalStorage = this.getLocaleFromLocalStorage();

    if (localeFromLocalStorage) {
      this.setLocale(localeFromLocalStorage);
    }
  }

  private getLocaleFromLocalStorage() {
    const localStorageData = localStorage.getItem(localStorageCartKey);

    return localStorageData ? localStorageData : null;
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
  },
  noInternet: {
    en: 'Cart has been cleared',
    ru: 'Корзина очищена'
  },
  notFound: {
    en: 'Product not found',
    ru: 'Товар не найден'
  },
  serverError: {
    en: 'Server-side error',
    ru: 'Ошибка сервера'
  },
  unknownError: {
    en: 'Ooops... something goes wrong',
    ru: 'Ууупс... что-то пошло не так'
  },
  onlineNow: {
    en: 'You are online now',
    ru: 'Соединение восстановлено'
  },
  offlineNow: {
    en: 'You are offline now',
    ru: 'Соединение потеряно'
  }
};
