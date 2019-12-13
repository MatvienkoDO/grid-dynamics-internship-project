import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { User } from '../../models';
import {
  AuthenticationService,
  UserService,
  CartService,
  FavouritesService
} from '../../services';
import { mustMatch } from '../../helpers/must-match.validator';
import { AccountModalService } from '../../services/account-modal/account-modal.service';
import { HttpClient } from '@angular/common/http';
import { apiHost } from 'src/environments';

@Component({
  selector: 'app-welcome-modal',
  templateUrl: './welcome-modal.component.html',
  styleUrls: ['./welcome-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeModalComponent implements OnInit {
  public static readonly config: MatDialogConfig<WelcomeModalComponent> = {
    width: '550px',
  };
  private errorMessageSubject: BehaviorSubject<[]>;
  public errorMessage$: Observable<[]>;
  private errorEmailMessage: BehaviorSubject<string> = new BehaviorSubject('');
  public errorEmailMessage$: Observable<string>;
  private errorCurrentPasswordMessage: BehaviorSubject<string> = new BehaviorSubject('');
  public errorCurrentPasswordMessage$: Observable<string>;
  public currentUser$: Observable<User>;

  public submitted = false;
  public isDisabled = true;

  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    oldPassword: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  constructor(
    private readonly dialogRef: MatDialogRef<WelcomeModalComponent>,
    private readonly authService: AuthenticationService,
    private readonly userService: UserService,
    private readonly cartService: CartService,
    private readonly favouritesService: FavouritesService,
    private formBuilder: FormBuilder,
    private readonly accountModalService: AccountModalService,
    private readonly http: HttpClient,
  ) {
    this.errorMessageSubject = new BehaviorSubject<[]>([]);
    this.errorMessage$ = this.errorMessageSubject.asObservable();
    this.errorEmailMessage$ = this.errorEmailMessage.asObservable();
    this.errorCurrentPasswordMessage$ = this.errorCurrentPasswordMessage.asObservable();
  }

  ngOnInit() {
    this.currentUser$ = this.userService.getMe();

    this.profileForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: ['', [Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      oldPassword: ['', [Validators.minLength(6)]],
      password: ['', [Validators.minLength(6)]],
      confirmPassword: [''],
    },
      {
        validator: mustMatch('password', 'confirmPassword')
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public logOut() {
    this.cartService.updateCartItems();
    this.cartService.clearCart();
    this.favouritesService.updateFavouritesItems();
    this.favouritesService.clearFavourites();
    this.authService.logout();
    this.onNoClick();
  }

  get profileFormControls() { return this.profileForm.controls; }

  onSubmitProfileForm(event: Event) {
    event.preventDefault();
    this.submitted = true;
    if (this.profileForm.invalid) {
      return;
    }
    const requestBody = {};
    for (const prop in this.profileForm.value) {
      if (this.profileForm.value.hasOwnProperty(prop)) {
        const element = this.profileForm.value[prop];
        if (element) {
          requestBody[prop] = element;
        }
      }
    }
    if (this.profileForm.value.password) {
      requestBody['newPassword'] = this.profileForm.value.password;
    }
    console.log(requestBody);
    const url = `${apiHost}/api/users`;
    const options = { withCredentials: true };
    this.http.patch<any>(url, requestBody, options)
        .pipe(
          catchError(er => {
            for (const error of er.error.errors) {
              if (error.property === 'currentPassword') {
                this.errorCurrentPasswordMessage.next(error.message);
              }
              if (error.property === 'email') {
                this.errorEmailMessage.next(error.message);
              }
            }
            return of();
          }),
        )
      .subscribe(
        (responseBody: any) => {
          if (responseBody && responseBody.success === false) {
            this.errorMessageSubject.next(responseBody.errors);
          } else {
            this.currentUser$ = responseBody.payload;
            this.errorCurrentPasswordMessage.next('');
            this.errorEmailMessage.next('');
          }
        });
  }

  formEnable(): void {
    this.isDisabled = false;
  }

}
