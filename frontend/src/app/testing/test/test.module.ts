import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MockTranslatePipe } from './mock-translate.pipe';

@NgModule({
  declarations: [
    MockTranslatePipe
  ],
  imports: [
    CommonModule
  ]
})
export class TestModule { }
