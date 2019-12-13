import { Injectable } from '@angular/core';

import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private service: NotifierService ) { }

  success(message: string) {
    this.service.notify('success', message);
  }

  error(message: string) {
    this.service.notify('error', message);
  }

  warning(message: string) {
    this.service.notify('warning', message);
  }

  info(message: string) {
    this.service.notify('info', message);
  }
}
