import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../shared/services/notification/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(protected _notify: NotificationService) { }
    sendInfo() {
      this._notify.info('This component is not working yet.');
  }

  ngOnInit() {
  }

}
