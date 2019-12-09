import { Component, OnInit, } from '@angular/core';
import { MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { first, catchError } from 'rxjs/operators';

import { MustMatch } from '../../helpers/must-match.validator';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { AccountModalService } from '../../services/account-modal/account-modal.service';
import { ErrorsService } from '../../services/errors/errors.service';
import { Error } from '../../models';
import { CartService } from '../../services';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  public static readonly dialogConfig: MatDialogConfig = {
    width: '550px',
    height: '630px',
  }
  private errorMessageSubject: BehaviorSubject<string>;
  public loginErrorMessage$: Observable<string>;
  public signupErrorMessage$: Observable<string>;

  submitted = false;
  loading = false;

  signupForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    public dialogRef: MatDialogRef<AccountComponent>,
    private formBuilder: FormBuilder,
    private readonly authenticationService: AuthenticationService,
    private readonly accountModalService: AccountModalService,
    private readonly errorsService: ErrorsService,
    private readonly cartService: CartService,
  ) {
    this.errorMessageSubject = new BehaviorSubject<string>('');
    this.loginErrorMessage$ = this.errorsService.getErrors(Error.Target.LogIn);
    this.signupErrorMessage$ = this.errorsService.getErrors(Error.Target.SignUp);
  }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    },
      {
        validator: MustMatch('password', 'confirmPassword')
      });
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  get signupFormControls() { return this.signupForm.controls; }
  get loginFormControls() { return this.loginForm.controls; }

  onSubmitSignupForm(event: Event) {
    event.preventDefault();
    this.submitted = true;
    if (this.signupForm.invalid) {
        return;
    }
    this.loading = true;
    this.authenticationService.signup(this.signupForm.value)
        .pipe(
          catchError(er => {
            this.loading = false;
            return of();
          }),
        )
        .subscribe(
          responseBody => {
            this.loading = false;
            if (responseBody && responseBody.status === 'error') {
              this.errorMessageSubject.next(responseBody.message);
            } else {
              this.accountModalService.emptyDialogStack();
              this.accountModalService.openWelcomeDialog();
              this.cartService.sendNewCartItems();
              this.cartService.getCartItems();
            }
        });
    this.signupForm.reset();
  }

  onSubmitLoginForm(event: Event): void {
    event.preventDefault();
    this.submitted = true;
    if (this.loginForm.invalid) {
        return;
    }
    this.loading = true;
    this.authenticationService.login(this.loginForm.value.email, this.loginForm.value.password)
        .pipe(
          catchError(er => {
            this.loading = false;
            return of();
          }),
        )
        .subscribe(
          responseBody => {
            this.loading = false;
            if (responseBody && responseBody.status === 'error') {
              this.errorMessageSubject.next(responseBody.message);
            } else {
              this.accountModalService.emptyDialogStack();
              this.accountModalService.openWelcomeDialog();
              this.cartService.sendNewCartItems();
              this.cartService.getCartItems();
            }
        });
    this.loginForm.reset();
  }
  // getErrorMessage() {
  //   return this.loginForm.hasError('required') ? 'You must enter a value' :
  //       this.loginForm.hasError('email') ? 'Not a valid email' :
  //           '';
  // }

  private resetSignUpForm() {
    this.signupForm.reset();
    this.loading = false;
  }
}
