import { Component, OnInit, } from '@angular/core';
import { MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { MustMatch } from '../../helpers/must-match.validator';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { NotificationService } from '../../services/notification/notification.service';
import { UserService } from '../../services/user/user.service';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  public static readonly dialogConfig: MatDialogConfig = {
    width: '550px',
    height: '580px',
  }

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
    private router: Router,
    private readonly notificationService: NotificationService,
    private userService: UserService,
  ) { 
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
    console.log(JSON.stringify(this.loginForm.value, null, 4));
    this.loginForm.reset();
  }
}
