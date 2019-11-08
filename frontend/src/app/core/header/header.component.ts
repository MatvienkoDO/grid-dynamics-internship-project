import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import { NotificationService } from '../../shared/services/notification/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private translate: TranslateService,
    protected _notify: NotificationService
  ) {
    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang('ru');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|ru/) ? browserLang : 'en');
   }
   
  sendInfo() {
      this._notify.info('This component is not working yet.');
  }

  ngOnInit() {
  }

}
