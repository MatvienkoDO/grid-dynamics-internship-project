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
}
