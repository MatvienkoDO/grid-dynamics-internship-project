import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-product-show',
  templateUrl: './product-show.component.html',
  styleUrls: ['./product-show.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductShowComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }
}
