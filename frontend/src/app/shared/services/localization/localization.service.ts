import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { localStorageLocaleKey } from '../../constants';

const langs = ['en', 'ru'];
const defaultLang = langs[0];

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {
  private readonly locale = new BehaviorSubject<string>(defaultLang);

  constructor(private readonly translate: TranslateService) {
    this.init();
  }

  private init() {
    this.translate.addLangs(langs);
    this.translate.setDefaultLang(defaultLang);

    const localStorageLocale = localStorage.getItem(localStorageLocaleKey);
    const lang = localStorageLocale && langs.includes(localStorageLocale)
      ? localStorageLocale
      : defaultLang;

    this.translate.use(lang);
    this.locale.next(lang);
  }

  public getLangs() {
    return langs;
  }

  public getLocale() {
    return this.locale.getValue();
  }

  public setLocale(lang: string) {
    if (!langs.includes(lang)) {
      throw {
        message: `'${lang}' is unknown. It does not exist in langs list (${langs.join(', ')})`,
      };
    }

    localStorage.setItem(localStorageLocaleKey, lang);
    location.reload();
  }

  public get(key: string): Observable<string> {
    return this.translate.get(key);
  }

  // FIXME: remove it later
  public getNotificationServiceMessage(type: string): string {
    const message = notificationServiceMessages[type];
    if (!message) {
      return '';
    }

    const localizedMessage = message[this.locale.getValue()];
    if (!localizedMessage) {
      return '';
    }

    return localizedMessage;
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
  onlineNow: {
    en: 'You are online now',
    ru: 'Вы онлайн'
  },
  offlineNow: {
    en: 'You are offline now',
    ru: 'Вы офлайн'
  }
};
