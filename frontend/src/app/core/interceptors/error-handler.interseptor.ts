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

import { NotificationService, LocalizationService } from '../../shared/services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  public static readonly provider = {
    provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true,
  };

  constructor(
    private readonly notificationService: NotificationService,
    private readonly localizationService: LocalizationService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 0) {
          this.notificationService.error(
            this.localizationService.getNotificationServiceMessage('noInternet'));
        } else if (error.status === 404) {
          const message = this.localizationService.getNotificationServiceMessage('notFound');
          this.notificationService.error(message);
        } else if (error.status >= 500 && error.status < 600) {
          this.notificationService.error(
            this.localizationService.getNotificationServiceMessage('serverError'));
        } else {
          this.notificationService.error(
            this.localizationService.getNotificationServiceMessage('unknownError'));
        }

        return throwError(error);
      })
    );
  }

}
