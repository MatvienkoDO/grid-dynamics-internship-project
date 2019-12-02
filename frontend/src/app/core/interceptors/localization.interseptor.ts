import { Injectable } from '@angular/core';
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

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const locale = localStorage.getItem('LOCALE');

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
