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
      this.locale.next(localeFromLocalStorage);
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
}
