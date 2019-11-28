import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialogConfig } from '@angular/material/dialog';

import { User } from '../../models/user';
import { UserService } from '../../services/user/user.service';

import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-welcome-modal',
  templateUrl: './welcome-modal.component.html',
  styleUrls: ['./welcome-modal.component.scss']
})
export class WelcomeModalComponent implements OnInit {
  public static readonly dialogConfig: MatDialogConfig = {
    width: '550px',
  }

  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];

  constructor(
    private readonly dialogRef: MatDialogRef<WelcomeModalComponent>,
    private readonly userService: UserService,
  ) { }

  ngOnInit() {
    this.loadAllUsers();
  }

  private loadAllUsers() {
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.users = users;
  });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
