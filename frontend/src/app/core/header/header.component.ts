import { Component, OnInit, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

import { NotificationService, LocalizationService } from '../../shared/services';
import { CartComponentInner, FavouritesComponentInner, AccountComponent, WelcomeModalComponent } from '../../shared/components';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public searchForm = new FormGroup({
    search: new FormControl(''),
  });

  constructor(
    public readonly localizationService: LocalizationService,
    private readonly dialog: MatDialog,
    private readonly elementRef: ElementRef,
    private readonly router: Router,
  ) { }

  ngOnInit() { }

  changeLanguage(value: string) {
    this.localizationService.setLocale(value);
  }

  openCart() : void {
    const dialogRef = this.dialog.open(CartComponentInner, {
      width: '950px'
    });
  }

  openFavourites() : void {
    const dialogRef = this.dialog.open(FavouritesComponentInner, {
      width: '550px'
    });
  }

  openAccount() : void {
    this.dialog.open(WelcomeModalComponent, WelcomeModalComponent.dialogConfig);
  }

  // TODO(tkatimulin): Rewrite this logic
  onClickMenuItem() {
    const closeButton = this.elementRef.nativeElement.querySelector('.mobile-menu__btn');
    closeButton.click();
  }

  submit() {
    const search = this.searchForm['search'];

    if (search) {
      this.router.navigateByUrl(`/products?search=${search}`);
    }
  }
}
