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

import { NotificationService, LocalizationService } from '../../shared/services';
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
    private readonly localization: LocalizationService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        const info: any | null = error.error;

        if (error.status === 0) {
          this.localization.get('error.noInternet').subscribe(this.notificationService.error);

        } else if (info.status === constants.authFailedMessage) {
          this.dialog.closeAll();
          this.dialog.open(AccountComponent, AccountComponent.dialogConfig);

          this.localization.get('error.youAreNotAuthenticated')
            .subscribe(this.notificationService.warning);

        } else if (info.status === constants.signupInvalidForm) {
          this.localization.get('error.signupInvalidForm').subscribe(localizedError => {
            this.notificationService.error(localizedError);
            this.errorsService.pushError(Error.Target.SignUp, localizedError);
          });

        } else if (info.status === constants.emailIsNotUnique) {
          this.localization.get('error.emailIsNotUnique').subscribe(localizedError => {
            this.notificationService.error(localizedError);
            this.errorsService.pushError(Error.Target.SignUp, localizedError);
          });

        } else if (info.status === constants.incorrectLoginPasswordPair) {
          this.localization.get('error.incorrectLoginPasswordPair').subscribe(localizedError => {
            this.notificationService.error(localizedError);
            this.errorsService.pushError(Error.Target.LogIn, localizedError);
          });

        } else if (error.status === 400) {
          this.localization.get('error.notFound').subscribe(this.notificationService.error);

        } else if (error.status === 404) {
          this.localization.get('error.notFound').subscribe(this.notificationService.error);

        } else if (error.status === 401) {
          this.authenticationService.logout();

        } else if (error.status >= 500 && error.status < 600) {
          this.localization.get('error.serverError').subscribe(this.notificationService.error);

        } else {
          this.localization.get('error.unknownError').subscribe(this.notificationService.error);
        }

        this.router.navigate(['']);

        return throwError(error);
      })
    );
  }
}
