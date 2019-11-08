import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { CardProduct } from '../../models';

@Component({
  selector: 'app-card-product[id][image-url][title][price][sizes][colors]',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardProductComponent implements OnInit {
  @Input('id') public readonly id: string;
  @Input('image-url') public readonly imageUrl: string;
  @Input('title') public readonly title: string;
  @Input('price') public readonly price: number;
  @Input('sizes') public readonly sizes: string[];
  @Input('colors') public readonly colors: string[];
  @Input('currency-sign') public readonly currencySign: string | undefined;

  @Output('show-details') public readonly showDetails = new EventEmitter<CardProduct>();
  @Output('add-to-cart') public readonly addToCart = new EventEmitter<CardProduct>();
  @Output('add-to-favorite') public readonly addToFavorite = new EventEmitter<CardProduct>();
  @Output('error') public readonly error = new EventEmitter<string>();

  public readonly size$ = new BehaviorSubject<string | undefined>(undefined);
  public readonly color$ = new BehaviorSubject<string | undefined>(undefined);

  constructor() { }

  ngOnInit() {
  }

  public readonly changeSize = size => {
    this.size$.next(size);
  }

  public readonly changeColor = color => {
    this.color$.next(color);
  }

  public readonly action = (sender: EventEmitter<CardProduct>) => {
    const size = this.size$.value;
    const color = this.color$.value;

    if (size && color) {
      const data: CardProduct = {
        id: this.id,
        title: this.title,
        size,
        color
      };

      sender.emit(data);
    } else {
      const message =
        (size ? '' : 'Size is not specified') +
        (size || color ? '' : '. ') +
        (color ? '' : 'Color is not specified');

      this.error.emit(message);
    }  
  }
}
