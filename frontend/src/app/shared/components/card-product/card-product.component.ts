import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss']
})
export class CardProductComponent implements OnInit {
  @Input('image-url') public readonly imageUrl: string;
  @Input('title') public readonly title: string;
  @Input('price') public readonly price: number;
  @Input('currency-sign') public readonly currencySign: string;
  @Input('sizes') public readonly sizes: string[];
  @Input('colors') public readonly colors: string[];

  public readonly size$ = new BehaviorSubject(undefined);
  public readonly color$ = new BehaviorSubject(undefined);

  constructor() { }

  ngOnInit() {
  }

  public readonly changeSize = size => {
    this.size$.next(size);
  }

  public readonly changeColor = color => {
    this.color$.next(color);
  }
}
