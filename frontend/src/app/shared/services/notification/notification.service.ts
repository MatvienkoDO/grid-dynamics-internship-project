import { Injectable } from '@angular/core';

import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(
    private readonly service: NotifierService,
  ) {
    this.success = this.success.bind(this);
    this.error = this.error.bind(this);
    this.warning = this.warning.bind(this);
    this.info = this.info.bind(this);
  }

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
