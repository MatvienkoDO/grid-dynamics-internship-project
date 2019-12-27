import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { AccountComponent } from '../../components/account/account.component';
import { WelcomeModalComponent } from '../../components/welcome-modal/welcome-modal.component';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AccountModalService {
  private dialogStack: MatDialogRef<any, any>[] = [];

  constructor(
    public readonly dialog: MatDialog,
    public readonly authService: AuthenticationService,
  ) { }

  public openAccountModal() {
    this.authService.currentUser.subscribe(
      currentUser => {
        if (currentUser) {
          this.openWelcomeDialog();
        } else {
          this.openLoginSignup();
        }
      }
    );
  }

  public openLoginSignup() {
    const dialogRef = this.dialog.open(AccountComponent, {
      width: '550px',
    });
    this.dialogStack.push(dialogRef);
  }

  public openWelcomeDialog() {
    const dialogRef = this.dialog.open(WelcomeModalComponent, WelcomeModalComponent.config);
    this.dialogStack.push(dialogRef);
  }

  public closeCurrentDialog() {
    const dialog = this.dialogStack.pop();
    if (dialog) {
      dialog.close();
    }
  }

  public emptyDialogStack() {
    let dialog = this.dialogStack.pop();
    while (dialog) {
      dialog.close();
      dialog = this.dialogStack.pop();
    }
  }
}
