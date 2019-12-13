import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { CardProduct, Image } from '../../models';

@Component({
  selector: 'app-card-product[id][image][title][price][sizes][colors]',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardProductComponent implements OnInit {
  @Input() public readonly id: string;
  @Input() public readonly image: Image;
  @Input() public readonly title: string;
  @Input() public readonly price: number;
  @Input() public readonly sizes: string[];
  @Input() public readonly colors: string[];

  @Input('currency-sign') public readonly currencySign: string = '$';

  @Output('show-details') public readonly showDetails = new EventEmitter<CardProduct>();
  @Output('add-to-cart') public readonly addToCart = new EventEmitter<CardProduct>();
  @Output('add-to-favorite') public readonly addToFavorite = new EventEmitter<CardProduct>();
  @Output() public readonly error = new EventEmitter<string>();

  public readonly size$ = new BehaviorSubject<string | undefined>(undefined);
  public readonly color$ = new BehaviorSubject<string | undefined>(undefined);

  ngOnInit() {
    const initialSize = this.sizes[0];
    const initialColor = this.colors[0];

    if (initialSize) {
      this.size$.next(initialSize);
    }
    if (initialColor) {
      this.color$.next(initialColor);
    }
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
        quantity: 1,
        price: this.price,
        size,
        color,
        image: this.image,
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
