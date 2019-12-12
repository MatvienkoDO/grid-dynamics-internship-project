import {
  Component,
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardProductSmallComponent {
  @Input() public readonly id: string;
  @Input() public readonly image: Image;
  @Input() public readonly title: string;
  @Input() public readonly price: string;
  @Input() public readonly sizes: string[];
  @Input() public readonly colors: string[];

  @Input('image-alt') public readonly imageAlt: string | undefined;
  @Input('currency-sign') public readonly currencySign: string | undefined;

  @Output('show-details') public readonly showDetails = new EventEmitter<CardProduct>();
  @Output('add-to-cart') public readonly addToCart = new EventEmitter<CardProduct>();

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
