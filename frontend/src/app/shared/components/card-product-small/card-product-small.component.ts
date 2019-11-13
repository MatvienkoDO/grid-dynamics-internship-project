import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { CardProduct } from '../../models/card-product';

@Component({
  selector: 'app-card-product-small[id][image-url][title][price]',
  templateUrl: './card-product-small.component.html',
  styleUrls: ['./card-product-small.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardProductSmallComponent implements OnInit {
  @Input('id') public readonly id: string;
  @Input('image-url') public readonly imageUrl: string;
  @Input('title') public readonly title: string;
  @Input('price') public readonly price: string;

  @Input('image-alt') public readonly imageAlt: string | undefined;
  @Input('currency-sign') public readonly currencySign: string | undefined;

  @Output('add-to-cart') public readonly addToCart = new EventEmitter<CardProduct>();

  constructor() { }

  ngOnInit() {
  }

  public readonly addToCartCb = () => {
    this.addToCart.emit({
      id: this.id,
      title: this.title,
      quantity: 1,
      price: Number(this.price)
    });
  }
}
