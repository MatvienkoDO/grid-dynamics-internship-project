import { NgModule, PLATFORM_ID, Inject, Optional } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  TranslateCacheModule,
  TranslateCacheSettings,
  TranslateCacheService
} from 'ngx-translate-cache';
import { isPlatformBrowser } from '@angular/common';
import { of, Observable } from 'rxjs';
import { join } from 'path';
import { readFileSync } from 'fs';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { BrowserTransferStateModule, TransferState } from '@angular/platform-browser';
import { Request } from 'express';

import { langs } from '../../shared/constants';

@NgModule({
  imports: [
    BrowserTransferStateModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateLoaderFactory,
        deps: [HttpClient, TransferState, PLATFORM_ID]
      }
    }),
    TranslateCacheModule.forRoot({
      cacheService: {
        provide: TranslateCacheService,
        useFactory: translateCacheFactory,
        deps: [TranslateService, TranslateCacheSettings]
      },
      cacheMechanism: 'Cookie'
    })
  ],
  exports: [TranslateModule]
})
export class I18nModule {
  constructor(
    translate: TranslateService,
    translateCacheService: TranslateCacheService,
    @Optional() @Inject(REQUEST) private req: Request,
    @Inject(PLATFORM_ID) private platform: any
  ) {
    if (isPlatformBrowser(this.platform)) {
      translateCacheService.init();
    }

    translate.addLangs(langs);

    const browserLang = isPlatformBrowser(this.platform)
      ? translateCacheService.getCachedLanguage() || translate.getBrowserLang() || 'en'
      : this.getLangFromServerSideCookie();

    translate.use(browserLang.match(langs) ? browserLang : 'en');
  }

  getLangFromServerSideCookie() {
    return 'en';
    if (this.req) {
      return this.req.cookies.lang;
    }
  }
}

export function translateCacheFactory(
  translateService: TranslateService,
  translateCacheSettings: TranslateCacheSettings
) {
  return new TranslateCacheService(translateService, translateCacheSettings);
}

export class TranslateFSLoader implements TranslateLoader {
  constructor(private prefix = './assets/i18n', private suffix = '.json') { }

  /**
   * Gets the translations from the server, store them in the transfer state
   */
  public getTranslation(lang: string): Observable<any> {
    const path = join(__dirname, '../browser', this.prefix, `${lang}${this.suffix}`);
    const data = JSON.parse(readFileSync(path, 'utf8'));

    return of(data);
  }
}

export function translateLoaderFactory(httpClient: HttpClient, platform: any) {
  return isPlatformBrowser(platform)
    ? new TranslateHttpLoader(httpClient)
    : new TranslateFSLoader();
}
