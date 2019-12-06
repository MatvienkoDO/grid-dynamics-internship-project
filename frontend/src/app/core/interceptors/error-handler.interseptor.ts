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
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';
import { AccountComponent } from 'src/app/shared/components';
import * as constants from '../../shared/constants';
import { ErrorsService } from 'src/app/shared/services/errors/errors.service';
import { Error } from '../../shared/models/error';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  public static readonly provider = {
    provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true,
  };

  constructor(
    private readonly notificationService: NotificationService,
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly authenticationService: AuthenticationService,
    private readonly errorsService: ErrorsService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        const info: any | null = error.error;

        if (error.status === 0) {
          this.notificationService.error(
            this.getNotificationServiceMessage('noInternet'));

        } else if (info.status === constants.authFailedMessage) {
          this.dialog.closeAll();
          this.dialog.open(AccountComponent, AccountComponent.dialogConfig);
          this.notificationService.warning(
            this.getNotificationServiceMessage('youAreNotAuthenticated'));

        } else if (info.status === constants.signupInvalidForm) {
          this.notificationService.error(
            this.getNotificationServiceMessage('signupInvalidForm'));
            this.errorsService.pushError(Error.Target.SignUp, info.message);

        } else if (info.status === constants.emailIsNotUnique) {
          this.notificationService.error(
            this.getNotificationServiceMessage('emailIsNotUnique'));
            this.errorsService.pushError(Error.Target.SignUp, info.message);

        } else if (info.status === constants.incorrectLoginPasswordPair) {
          const message = this.getNotificationServiceMessage('invalidLoginPasswordPair');
          // this.notificationService.error(
          //   this.getNotificationServiceMessage('invalid Email/Password'));
          this.errorsService.pushError(Error.Target.LogIn, message);

        } else if (error.status === 400) {
          this.notificationService.error(
            this.getNotificationServiceMessage('notFound'));
  
        } else if (error.status === 404) {
          this.notificationService.error(
            this.getNotificationServiceMessage('notFound'));

        } else if (error.status === 401) {	
          this.authenticationService.logout();	

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
    en: 'There is no Internet connection',
    ru: 'Отсутствует Интернет соединение'
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
  signupInvalidForm: {
    en: 'Invalid form data',
    ru: 'Данные формы некорректны',
  },
  emailIsNotUnique: {
    en: 'Email is not unique',
    ru: 'Данный e-mail уже используется',
  },
  invalidLoginPasswordPair: {
    en: 'Invalid login-password pair',
    ru: 'Неправильный логин и/или пароль',
  },
};
