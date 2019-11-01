import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CardData {
  id: string;
  size: string;
  color: string;
}

@Component({
  selector: 'app-card-product[id][image-url][title][price][sizes][colors]',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss']
})
export class CardProductComponent implements OnInit {
  @Input('id') public readonly id: string;
  @Input('image-url') public readonly imageUrl: string;
  @Input('title') public readonly title: string;
  @Input('price') public readonly price: number;
  @Input('sizes') public readonly sizes: string[];
  @Input('colors') public readonly colors: string[];
  @Input('currency-sign') public readonly currencySign: string | undefined;

  @Output('show-details') public readonly showDetails = new EventEmitter<CardData>();
  @Output('add-to-cart') public readonly addToCart = new EventEmitter<CardData>();
  @Output('add-to-favorite') public readonly addToFavorite = new EventEmitter<CardData>();
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

  public readonly action = (sender: EventEmitter<CardData>) => {
    const size = this.size$.value;
    const color = this.color$.value;

    if (size && color) {
      const data: CardData = {
        id: this.id,
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
