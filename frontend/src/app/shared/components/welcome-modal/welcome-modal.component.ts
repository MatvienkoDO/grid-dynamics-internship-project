import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '../../models/user';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-welcome-modal',
  templateUrl: './welcome-modal.component.html',
  styleUrls: ['./welcome-modal.component.scss']
})
export class WelcomeModalComponent implements OnInit {
  public static readonly config: MatDialogConfig<WelcomeModalComponent> = {
    width: '550px',
  };

  private readonly currentUserSubject: BehaviorSubject<User|null>;
  currentUser$: Observable<User|null>;

  constructor(
    private readonly dialogRef: MatDialogRef<WelcomeModalComponent>,
    private readonly authService: AuthenticationService,
  ) {
    this.currentUserSubject = new BehaviorSubject<User|null>(null);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  public logOut() {
    this.authService.logout();
    this.onNoClick();
  }
}
