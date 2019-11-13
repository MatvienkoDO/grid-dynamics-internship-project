import { Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';

import { NotificationService, LocalizationService } from './shared/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'frontend';

  onlineEvent: Observable<Event>;
  offlineEvent: Observable<Event>;

  subscriptions: Subscription[] = [];

  connectionStatusMessage: string;
  connectionStatus: string;

  constructor(
    private readonly notificationService: NotificationService,
    private readonly localizationService: LocalizationService,
  ) {}

  ngOnInit(): void {
    /**
    * Get the online/offline status from browser window
    */
    this.onlineEvent = fromEvent(window, 'online');
    this.offlineEvent = fromEvent(window, 'offline');

    this.subscriptions.push(this.onlineEvent.subscribe(e => {
      this.connectionStatusMessage = 'Back to online';
      this.connectionStatus = 'online';
      const message = this.localizationService.getNotificationServiceMessage('onlineNow');
      this.notificationService.info(message);
    }));

    this.subscriptions.push(this.offlineEvent.subscribe(e => {
      this.connectionStatusMessage = 'Connection lost! You are not connected to internet';
      this.connectionStatus = 'offline';
      const message = this.localizationService.getNotificationServiceMessage('offlineNow');
      this.notificationService.warning(message);
    }));
  }

  ngOnDestroy(): void {
    /**
    * Unsubscribe all subscriptions to avoid memory leak
    */
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
