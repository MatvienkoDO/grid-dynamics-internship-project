import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { User } from '../../models';
import { AuthenticationService, UserService, CartService, FavouritesService } from '../../services';

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

  constructor(
    private readonly dialogRef: MatDialogRef<WelcomeModalComponent>,
    private readonly authService: AuthenticationService,
    private readonly userService: UserService,
    private readonly cartService: CartService,
    private readonly favouritesService: FavouritesService,
  ) { }

  ngOnInit() {
    this.currentUser$ = this.userService.getMe();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public logOut() {
    this.cartService.updateCartItems();
    this.cartService.clearCart();
    this.favouritesService.clearFavourites();
    this.authService.logout();
    this.onNoClick();
  }
}
