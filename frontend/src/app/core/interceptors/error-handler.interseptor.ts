import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
    provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true
  };

  constructor(
    private readonly notificationService: NotificationService,
    private readonly router: Router,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 0) {
          this.notificationService.error('Error: there is no internet connection');
        } else if (error.status === 404) {
          this.notificationService.error('Error: resourse not found');
        } else if (error.status >= 500 && error.status < 600) {
          this.notificationService.error('Error: server-side error');
        } else {
          this.notificationService.error('Error: unknown error');
        }
        this.router.navigate(['']);
        
        return throwError(error);
      })
    );
  }

}
