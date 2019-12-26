import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import {
  LocalizationService,
  ProductFilterService,
} from '../../shared/services';
import {
  CartComponentInner,
  FavouritesComponentInner,
} from '../../shared/components';
import { AccountModalService } from 'src/app/shared/services/account-modal/account-modal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public searchForm = new FormGroup({
    search: new FormControl(''),
  });

  private readonly subscriptions: Subscription[] = [];

  constructor(
    public readonly localizationService: LocalizationService,
    private readonly dialog: MatDialog,
    private readonly elementRef: ElementRef,
    private readonly router: Router,
    private readonly accountModal: AccountModalService,
    private readonly productFilterService: ProductFilterService,
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.productFilterService.query$.subscribe(query => {
        this.searchForm.patchValue({
          search: query.filter.search
        });
      }),
    );
   }

   ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  changeLanguage(value: string) {
    this.localizationService.setLocale(value);
  }

  openCart(): void {
    const dialogRef = this.dialog.open(CartComponentInner, {
      width: '950px'
    });
  }

  openFavourites(): void {
    const dialogRef = this.dialog.open(FavouritesComponentInner, {
      width: '550px'
    });
  }

  openAccount(): void {
    this.accountModal.openAccountModal();
  }

  // TODO(tkatimulin): Rewrite this logic
  onClickMenuItem() {
    const closeButton = this.elementRef.nativeElement.querySelector('.mobile-menu__btn');
    closeButton.click();
  }

  submit() {
    const search = this.searchForm.value.search;

    if (search) {
      this.router.navigateByUrl(`/products?search=${search}`);
    }
  }
}
