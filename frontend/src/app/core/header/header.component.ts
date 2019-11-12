import { Component, OnInit } from '@angular/core';

import { NotificationService } from '../../shared/services/notification/notification.service';
import { LocalizationService } from 'src/app/shared/services/localization/localization.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private readonly localizationService: LocalizationService,
    private readonly notify: NotificationService,
  ) { }

  ngOnInit() {
    
  }

  changeLanguage(value: string) {
    this.localizationService.setLocale(value);
  }

}
