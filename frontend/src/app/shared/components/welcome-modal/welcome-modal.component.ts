import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { User } from '../../models';
import { AuthenticationService, UserService, CartService } from '../../services';
import { MustMatch } from '../../helpers/must-match.validator';
import { AccountModalService } from '../../services/account-modal/account-modal.service';

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
  private errorMessageSubject: BehaviorSubject<string>;
  public currentUser$: Observable<User>;

  public submitted = false;
  public isDisabled = true;

  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  constructor(
    private readonly dialogRef: MatDialogRef<WelcomeModalComponent>,
    private readonly authService: AuthenticationService,
    private readonly userService: UserService,
    private readonly cartService: CartService,
    private formBuilder: FormBuilder,
    private readonly accountModalService: AccountModalService,
  ) {
    this.errorMessageSubject = new BehaviorSubject<string>('');
  }

  ngOnInit() {
    this.currentUser$ = this.userService.getMe();

    this.profileForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: ['', [Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    },
      {
        validator: MustMatch('password', 'confirmPassword')
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public logOut() {
    this.cartService.updateCartItems();
    this.cartService.clearCart();
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
    this.userService.updateUserData(this.profileForm.value)
        .pipe(
          catchError(er => {
            return of();
          }),
        )
      .subscribe(
        responseBody => {
          if (responseBody && responseBody.status === 'error') {
            this.errorMessageSubject.next(responseBody.message);
          } else {
            this.accountModalService.emptyDialogStack();
            this.cartService.sendNewCartItems();
            this.cartService.getCartItems();
          }
        });
  }

  formEnable(): void {
    this.isDisabled = false;
  }

}
