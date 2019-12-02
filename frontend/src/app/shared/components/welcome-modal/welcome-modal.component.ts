import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MatDialogConfig } from '@angular/material/dialog';

import { User } from '../../models/user';
import { apiHost } from 'src/environments/environment'

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
  users: User[] = [];

  constructor(
    private readonly dialogRef: MatDialogRef<WelcomeModalComponent>,
    private readonly http: HttpClient,
  ) { }

  ngOnInit() {
    this.http
      .get(`${apiHost}/api/auth/user-is-authenticated`, {withCredentials: true})
      .subscribe();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
