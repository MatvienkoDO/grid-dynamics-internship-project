import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { NotificationService } from '../../shared/services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  public static readonly provider = {
    provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true,
  };

  constructor(
    private readonly notificationService: NotificationService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 0) {
          this.notificationService.error(
            this.getNotificationServiceMessage('noInternet'));
        } else if (error.status === 404) {
          this.notificationService.error(
            this.getNotificationServiceMessage('notFound'));
        } else if (error.status >= 500 && error.status < 600) {
          this.notificationService.error(
            this.getNotificationServiceMessage('serverError'));
        } else {
          this.notificationService.error(
            this.getNotificationServiceMessage('unknownError'));
        }

        return throwError(error);
      })
    );
  }

  private getNotificationServiceMessage(type: string) {
    const locale = localStorage.getItem('LOCALE');
    return errorMessages[type][locale];
  }

}

const errorMessages = {
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
