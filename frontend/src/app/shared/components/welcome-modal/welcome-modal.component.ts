import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';

import { User } from '../../models';
import { AuthenticationService, UserService, CartService } from '../../services';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from '../../helpers/must-match.validator';
import { catchError } from 'rxjs/operators';

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

  public currentUser$: Observable<User>;

  public submitted = false;
  public loading = false;

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
  ) { }

  ngOnInit() {
    this.currentUser$ = this.userService.getMe();

    this.profileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
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

  get profileFormFormControls() { return this.profileForm.controls; }

  onSubmitprofileForm(event: Event) {
    event.preventDefault();
    this.submitted = true;
    if (this.profileForm.invalid) {
        return;
    }
    this.loading = true;
    this.authService.signup(this.profileForm.value)
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
              // this.errorMessageSubject.next(responseBody.message);
            } else {
              // this.accountModalService.emptyDialogStack();
              // this.accountModalService.openWelcomeDialog();
              this.cartService.sendNewCartItems();
              this.cartService.getCartItems();
            }
        });
  }

}
