import { Component, OnInit, } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { MustMatch } from '../../helpers/must-match.validator';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { AccountModalService } from '../../services/account-modal/account-modal.service';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  private errorMessageSubject: BehaviorSubject<string>;
  public errorMessage$: Observable<string>;

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
  ) {
    this.errorMessageSubject = new BehaviorSubject<string>('');
    this.errorMessage$ = this.errorMessageSubject.asObservable();
  }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    },
      {
        validator: MustMatch('password', 'confirmPassword')
      });
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  get f() { return this.signupForm.controls; }

  onSubmitSignupForm(event: Event): void {
    event.preventDefault();
    this.submitted = true;
    if (this.signupForm.invalid) {
        return;
    }
    this.loading = true;
    console.log(JSON.stringify(this.signupForm.value, null, 4));
    this.signupForm.reset();
  }

  onSubmitLoginForm(event: Event): void {
    event.preventDefault();
    if (this.loginForm.invalid) {
        return;
    }
    this.loading = true;
    this.authenticationService.login(this.loginForm.value.email, this.loginForm.value.password)
        .pipe(first())
        .subscribe(
          responseBody => {
            this.loading = false;
            if (responseBody && responseBody.status === 'error') {
              this.errorMessageSubject.next(responseBody.message);
            } else {
              this.accountModalService.closeCurrentDialog();
              this.accountModalService.openWelcomeDialog();
            }
        });
    this.loginForm.reset();
  }
}
