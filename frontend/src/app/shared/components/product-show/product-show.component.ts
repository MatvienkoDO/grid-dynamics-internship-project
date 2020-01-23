import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatDialog } from '@angular/material';
import { BehaviorSubject } from 'rxjs';

import { CardProduct, Image } from '../../models';
import { ImageSliderComponent } from '../image-slider/image-slider.component';

@Component({
  selector: 'app-product-show[id][title][sizes][price]',
  templateUrl: './product-show.component.html',
  styleUrls: ['./product-show.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductShowComponent implements OnInit {
  @Input() id: string;
  @Input() title: string;
  @Input() sizes: string[];
  @Input() price: number;

  @Input('short-description') shortDescription = '';
  @Input() description = '';
  @Input() currency = '$';
  @Input() images: Image[] = [];

  @Output() share = new EventEmitter<CardProduct>();
  @Output('add-to-cart') addToCart = new EventEmitter<CardProduct>();
  @Output('add-to-favorite') addToFavorite = new EventEmitter<CardProduct>();

  public readonly size$ = new BehaviorSubject<string | undefined>(undefined);
  public readonly quantity$ = new BehaviorSubject<number>(1);
  public readonly currentImage$ = new BehaviorSubject(0);

  constructor(
    private readonly dialog: MatDialog,
  ) {

  }

  ngOnInit() {
    const initialSize = this.sizes[0];
    if (initialSize) {
      this.size$.next(initialSize);
    }
  }

  public changeSize = (newSize: string) => {
    this.size$.next(newSize);
  }

  public readonly increaseQuantity = () => {
    this.quantity$.next(
      this.quantity$.value + 1
    );
  }

  public readonly decreaseQuantity = () => {
    this.quantity$.next(
      Math.max(this.quantity$.value - 1, 1)
    );
  }

  public readonly shareCb = () => {
    const info = this.generateCardProduct();
    this.share.emit(info);
  }

  public readonly addToCartCb = () => {
    const info = this.generateCardProduct();
    this.addToCart.emit(info);
  }

  public readonly addToFavoriteCb = () => {
    const info = this.generateCardProduct();
    this.addToFavorite.emit(info);
  }

  public readonly orderNow = () => {
    // TODO: realize ordering
    alert(`It is not realized yet. Id: ${this.id}`);
  }

  public readonly changeImage = (imageNumber: number) => {
    const current = this.currentImage$.value;

    if (current !== imageNumber) {
      this.currentImage$.next(imageNumber);
    }
  }

  public readonly prevImage = () => {
    const previous = this.currentImage$.value - 1;

    if (previous >= 0) {
      this.currentImage$.next(previous);
    }
  }

  public readonly nextImage = () => {
    const next = this.currentImage$.value + 1;

    if (next < this.images.length) {
      this.currentImage$.next(next);
    }
  }

  private readonly generateCardProduct = (): CardProduct => {
    const info: CardProduct = {
      id: this.id,
      title: this.title,
      size: this.size$.value,
      quantity: this.quantity$.value,
      price: this.price,
      image: this.images[0]
    };

    return info;
  }

  openZoomModal(): void {
    this.dialog.open(ImageSliderComponent, {
      data: {
        images: this.images,
      },
      width: '90%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'image-slider',
    });
  }
}
