import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '../../models/user';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-welcome-modal',
  templateUrl: './welcome-modal.component.html',
  styleUrls: ['./welcome-modal.component.scss']
})
export class WelcomeModalComponent implements OnInit {
  currentUserSubject: BehaviorSubject<User|null>;
  currentUser$: Observable<User|null>;

  constructor(
    public readonly dialogR: MatDialogRef<WelcomeModalComponent>,
    public readonly authService: AuthenticationService,
  ) {
    this.currentUserSubject = new BehaviorSubject<User|null>(this.getUserFromLocalStorage());
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  ngOnInit() {}

  private getUserFromLocalStorage(): User | null {
    const localStorageUserValue = localStorage.getItem('currentUser');
    return localStorageUserValue ? JSON.parse(localStorageUserValue) : null;
  }

  onNoClick(): void {
    this.dialogR.close();
  }

  public logOut() {
    this.authService.logout();
    this.onNoClick();
  }
}
