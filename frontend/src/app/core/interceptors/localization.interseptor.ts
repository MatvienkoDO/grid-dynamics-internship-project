import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { LocalizationService } from '../../shared/services';

@Injectable()
export class LocalizationInterceptor implements HttpInterceptor {

  public static readonly provider = {
    provide: HTTP_INTERCEPTORS, useClass: LocalizationInterceptor, multi: true,
  };

  constructor(
    private readonly localizationService: LocalizationService
  ) {
    console.log(this.localizationService);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const localizedReq = request.clone({ headers: request.headers.set( 'locale', this.localizationService.getLocale())});

    // send cloned request with header to the next handler.
    return next.handle(localizedReq);
  }

}
