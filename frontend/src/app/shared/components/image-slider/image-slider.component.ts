import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject, Observable } from 'rxjs';

import { Image } from '../../models';
import { isNumber } from 'util';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss']
})
export class ImageSliderComponent implements OnInit {
  @Input() public readonly imagePaths: [Image];

  private currentNumber: number;
  private currentImage: BehaviorSubject<Image>;
  public currentImage$: Observable<Image>;

  constructor(
    private readonly sanitizer: DomSanitizer,
  ) {
    this.currentImage = new BehaviorSubject({
      '1_1': '', '4_3': '', '16_9': '', 'scale': '', 'default': ''
    });
  }

  ngOnInit() {
    if (this.imagePaths.length) {
      this.currentNumber = 0;
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
}
