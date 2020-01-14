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

@Injectable()
export class LocalizationInterceptor implements HttpInterceptor {

  public static readonly provider = {
    provide: HTTP_INTERCEPTORS,
    useClass: LocalizationInterceptor,
    multi: true,
  };

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let locale: string | null = 'en';
    if (isPlatformBrowser(this.platformId)) {
      locale = localStorage.getItem('LOCALE');
    }

    if (!locale) {
      return next.handle(request);
    }

    const requestUpdate = {
      headers: request.headers.set('locale', locale)
    };

    const localizedRequest = request.clone(requestUpdate);

    return next.handle(localizedRequest);
  }

}
