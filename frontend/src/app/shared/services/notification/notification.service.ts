import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private _service: NotifierService ) { }
   success(msg: string) {
    this._service.notify(
      'sucess',
      msg
    )
  }
    error(msg: string) {
    this._service.notify(
      'error',
      msg
    )
  }
   warning(msg: string) {
    this._service.notify(
      'warning',
      msg
    )
  }
   info(msg: string) {
    this._service.notify(
      'info',
      msg
    )
  }
}
