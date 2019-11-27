import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { CardProduct, Image } from '../../models';

@Component({
  selector: 'app-card-product-small[id][image][title][price]',
  templateUrl: './card-product-small.component.html',
  styleUrls: ['./card-product-small.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardProductSmallComponent implements OnInit {
  @Input('id') public readonly id: string;
  @Input('image') public readonly image: Image;
  @Input('title') public readonly title: string;
  @Input('price') public readonly price: string;
  @Input('sizes') public readonly sizes: string[];
  @Input('colors') public readonly colors: string[];

  @Input('image-alt') public readonly imageAlt: string | undefined;
  @Input('currency-sign') public readonly currencySign: string | undefined;

  @Output('show-details') public readonly showDetails = new EventEmitter<CardProduct>();
  @Output('add-to-cart') public readonly addToCart = new EventEmitter<CardProduct>();

  constructor() { }

  ngOnInit() {
  }

  public readonly showDetailsCb = () => {
    this.showDetails.emit(this.generateCardProduct());
  }

  public readonly addToCartCb = () => {
    this.addToCart.emit(this.generateCardProduct());
  }

  private readonly generateCardProduct = () => {
    const info: CardProduct = {
      id: this.id,
      title: this.title,
      quantity: 1,
      price: Number(this.price),
      image: this.image,
      size: this.sizes[0],
      color: this.colors[0],
    };

    return info;
  }
}
