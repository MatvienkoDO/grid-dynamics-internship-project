import { NgModule } from '@angular/core';
import { NotifierOptions, NotifierModule } from 'angular-notifier';
import { customNotifierOptions } from '../../shared/constants';
@NgModule({
  imports: [
    NotifierModule.withConfig(customNotifierOptions as any as NotifierOptions)
  ],
  exports: [NotifierModule]
})
export class NotificationModule { }
