import { Component, OnInit, ElementRef } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { NotificationService, LocalizationService } from '../../shared/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(
    private readonly localizationService: LocalizationService,
    private readonly notify: NotificationService,
    private readonly elRef: ElementRef
  ) { }

  ngOnInit() {
    
  }

  changeLanguage(value: string) {
    this.localizationService.setLocale(value);
  }

  onClickMenuItem() {
    const closeButton = this.elRef.nativeElement.querySelector('.mobile-menu__btn');
    closeButton.click();
  }
}
