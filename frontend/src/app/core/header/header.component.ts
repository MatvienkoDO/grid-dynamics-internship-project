import { 
  Component,
  OnInit,
  ElementRef 
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { NotificationService } from '../../shared/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(
    public readonly translate: TranslateService,
    private readonly notify: NotificationService,
    private readonly elRef: ElementRef
  ) { }

  ngOnInit() {
    this.translate.addLangs(['en', 'ru']);
    this.translate.setDefaultLang('en');

    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|ru/) ? browserLang : 'en');
  }

  onClickMenuItem() {
    const closeButton = this.elRef.nativeElement.querySelector('.mobile-menu__btn');
    closeButton.click();
  }
}
