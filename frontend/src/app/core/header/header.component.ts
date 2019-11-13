import { 
  Component,
  OnInit,
  ElementRef 
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';

import { NotificationService } from '../../shared/services';
import { CartComponentInner } from '../../shared/components';
import { FavouritesComponentInner } from '../../shared/components';

import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(
    public readonly translate: TranslateService,
    private readonly notify: NotificationService,
    public dialog: MatDialog,
    private readonly elRef: ElementRef
  ) { }

  ngOnInit() {
    this.translate.addLangs(['en', 'ru']);
    this.translate.setDefaultLang('en');

    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|ru/) ? browserLang : 'en');
  }

  openCart() : void {
    const dialogRef = this.dialog.open(CartComponentInner, {
      width: '950px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openFavourites() : void {
    const dialogRef = this.dialog.open(FavouritesComponentInner, {
      width: '550px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onClickMenuItem() {
    const closeButton = this.elRef.nativeElement.querySelector('.mobile-menu__btn');
    closeButton.click();
  }
}
