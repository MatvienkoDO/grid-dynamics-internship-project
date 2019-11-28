import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
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
import { AccountComponent } from 'src/app/shared/components';
import * as constants from '../../shared/constants';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  public static readonly provider = {
    provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true,
  };

  constructor(
    private readonly notificationService: NotificationService,
    private readonly router: Router,
    private readonly dialog: MatDialog,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        const info: any | null = error.error;

        if (error.status === 0) {
          this.notificationService.error(
            this.getNotificationServiceMessage('noInternet'));

        } else if (error.status === 404) {
          this.notificationService.error(
            this.getNotificationServiceMessage('notFound'));

        } else if (info.status === constants.authFailedMessage) {
          this.dialog.closeAll();
          this.dialog.open(AccountComponent, AccountComponent.dialogConfig);
          this.notificationService.warning(
            this.getNotificationServiceMessage('youAreNotAuthenticated'));

        } else if (error.status >= 500 && error.status < 600) {
          this.notificationService.error(
            this.getNotificationServiceMessage('serverError'));

        } else {
          this.notificationService.error(
            this.getNotificationServiceMessage('unknownError'));
        }

        this.router.navigate(['']);

        return throwError(error);
      })
    );
  }

  private getNotificationServiceMessage(type: string) {
    const locale = localStorage.getItem('LOCALE') || 'en';

    const message = errorMessages[type];

    if (message) {
      return message[locale];
    }

    return '';
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
  },
  youAreNotAuthenticated: {
    en: 'You are not authenticated',
    ru: 'Вы не аутентифицированы',
  },
};
