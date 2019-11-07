import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, repeat } from 'rxjs/operators';

import { NotificationService } from '../../../shared/services/index';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private readonly notificationService: NotificationService
  ) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      repeat(3),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.notificationService.error('Resourse not found');
        } else if (error.status === 500) {
          this.notificationService.error('Oooops... something goes wrong!');
        }
        return throwError(error);
      })
    );
  }
}