import { Injectable } from '@angular/core';

import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private service: NotifierService ) { }

  success(msg: string) {
    this.service.notify('success', msg);
  }

  error(msg: string) {
    this.service.notify('error', msg);
  }

  warning(msg: string) {
    this.service.notify('warning', msg);
  }

  info(msg: string) {
    this.service.notify('info', msg);
  }
}
