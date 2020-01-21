import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { localStorageLocaleKey } from 'src/app/shared/constants';

@Injectable()
export class LocalizationInterceptor implements HttpInterceptor {

  public static readonly provider = {
    provide: HTTP_INTERCEPTORS,
    useClass: LocalizationInterceptor,
    multi: true,
  };

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let locale: string | null = 'en';
    if (isPlatformBrowser(this.platformId)) {
      locale = localStorage.getItem(localStorageLocaleKey);
    }

    if (!locale) {
      locale = this.getCookie('lang');
    }

    const requestUpdate = {
      headers: request.headers.set('locale', locale)
    };

    const localizedRequest = request.clone(requestUpdate);

    return next.handle(localizedRequest);
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
}
