import { Component, OnInit, Input, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BehaviorSubject, Observable } from 'rxjs';

import { Image } from '../../models';
import { isNumber } from 'util';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss']
})
export class ImageSliderComponent implements OnInit {
  public readonly imagePaths: [Image];

  private currentNumber: number;
  private currentImage: BehaviorSubject<Image>;
  public currentImage$: Observable<Image>;

  private xDown = 0;
  private yDown = 0;

  constructor(
    private readonly sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public readonly dialogRef: MatDialogRef<ImageSliderComponent>,
  ) {
    this.imagePaths = data.images;
    this.currentImage = new BehaviorSubject({
      '1_1': '', '4_3': '', '16_9': '', 'scale': '', 'default': ''
    });
  }

  ngOnInit() {
    if (this.imagePaths.length) {
      this.currentNumber = this.data.currentNumber;
      this.currentImage.next(this.imagePaths[this.currentNumber]);
    }
    this.currentImage$ = this.currentImage.asObservable();
  }

  public trustStyle(style: string) {
    this.sanitizer.bypassSecurityTrustStyle(style);
  }

  public changeSlide(i: number) {
    if (isNumber(i)) {
      this.currentNumber = i;
      this.currentImage.next(this.imagePaths[i]);
    }
  }

  public isChecked(i: number) {
    return i === this.currentNumber;
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public showPrev(): void {
    if (this.currentNumber > 0) {
      this.changeSlide(this.currentNumber - 1);
    }
  }

  public showNext(): void {
    if (this.currentNumber < this.imagePaths.length - 1) {
      this.changeSlide(this.currentNumber + 1);
    }
  }

  public isEnabledPrev(): boolean {
    return this.currentNumber > 0;
  }

  public isEnabledNext(): boolean {
    return this.currentNumber < this.imagePaths.length - 1;
  }

  private getTouches(evt) {
    return evt.touches;
  }

  public handleTouchStart(event) {
    const firstTouch = this.getTouches(event)[0];
    this.xDown = firstTouch.clientX;
    this.yDown = firstTouch.clientY;
  }

  public handleTouchMove(event) {
    if ( ! this.xDown || ! this.yDown ) {
      return;
    }

    const xUp = event.touches[0].clientX;
    const yUp = event.touches[0].clientY;

    const xDiff = this.xDown - xUp;
    const yDiff = this.yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
        if ( xDiff > 0 ) {
            /* left swipe */
            if (this.isEnabledPrev()) {
              this.showPrev();
            }
        } else {
            /* right swipe */
            if (this.isEnabledNext()) {
              this.showNext();
            }
        }
    } else {
        if ( yDiff > 0 ) {
            /* up swipe */
        } else {
            /* down swipe */
        }
    }
    /* reset values */
    this.xDown = 0;
    this.yDown = 0;
  }
}
