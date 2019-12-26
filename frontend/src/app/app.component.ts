import { Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';

import { NotificationService, LocalizationService } from './shared/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  constructor(
    private readonly notificationService: NotificationService,
    private readonly localizationService: LocalizationService,
  ) {}

  ngOnInit(): void {
    const onlineEvent = fromEvent(window, 'online');
    const offlineEvent = fromEvent(window, 'offline');

    this.subscriptions.push(onlineEvent.subscribe(() => {
      const message = this.localizationService.getNotificationServiceMessage('onlineNow');
      this.notificationService.info(message);
    }));

    this.subscriptions.push(offlineEvent.subscribe(() => {
      const message = this.localizationService.getNotificationServiceMessage('offlineNow');
      this.notificationService.warning(message);
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
