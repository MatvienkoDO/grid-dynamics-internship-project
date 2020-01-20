import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

import { localStorageLocaleKey, langs } from '../../constants';

const defaultLang = langs[0];

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {
  private readonly locale = new BehaviorSubject<string>(defaultLang);

  constructor(
    private readonly translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: any,
  ) {
    this.init();
  }

  private init() {

    let localStorageLocale: string|null = 'en';
    if (isPlatformBrowser(this.platformId)) {
      localStorageLocale = localStorage.getItem(localStorageLocaleKey);
      if (!localStorageLocale) {
        localStorageLocale = this.getCookie('lang');
      }
    }
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

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(localStorageLocaleKey, lang);
      this.setCookie('lang', lang);
    }
    location.reload();
  }

  public get(key: string): Observable<string> {
    return this.translate.get(key);
  }

  private getCookie(key: string): string {
    const decodedCookie: string = decodeURIComponent(document.cookie);
    const pairs: string[] = decodedCookie.split(/;\s*/);

    const prefix = `${key}=`;
    for (const pair of pairs) {
      if (pair.indexOf(prefix) === 0) {
        return pair.substring(prefix.length);
      }
    }

    return '';
  }

  private setCookie(key: string, value: string, expires?: Date): void {
    let cookieValue = `${key}=${value}`;
    if (expires) {
      cookieValue += `;expires='${expires.toUTCString()}'`;
    }
    document.cookie = cookieValue;
  }
}
