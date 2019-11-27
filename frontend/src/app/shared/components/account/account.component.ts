import { Component, OnInit, } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { MustMatch } from '../../helpers/must-match.validator';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

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
  ) { }

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
    console.log(JSON.stringify(this.signupForm.value, null, 4));
    this.signupForm.reset();
  }

  onSubmitLoginForm(event: Event): void {
    event.preventDefault();
    if (this.loginForm.invalid) {
        return;
    }
    console.log(JSON.stringify(this.loginForm.value, null, 4));
    this.loginForm.reset();
  }
}