import { NgModule } from '@angular/core';
import { NotifierModule } from 'angular-notifier';
import { customNotifierOptions } from '../../shared/constants';
@NgModule({
  imports: [
    NotifierModule.withConfig(customNotifierOptions)
  ],
  exports: [NotifierModule]
})
export class NotificationModule { }
