import { Injectable } from '@angular/core';

import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(
    private readonly service: NotifierService,
  ) { }

  public success(message: string) {
    this.service.notify('success', message);
  }

  public error(message: string) {
    this.service.notify('error', message);
  }

  public warning(message: string) {
    this.service.notify('warning', message);
  }

  public info(message: string) {
    this.service.notify('info', message);
  }
}
