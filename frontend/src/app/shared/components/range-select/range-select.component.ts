import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-range-select',
  templateUrl: './range-select.component.html',
  styleUrls: ['./range-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RangeSelectComponent implements OnInit {
  @Input() title = '';
  @Input() currency = '$';
  @Input() floor = 0;
  @Input() ceil = 10000;
  @Input() set initialLow(value: number) {
    this.lowValue = value;
    this.highValue = this.highValue || 0;
  }
  @Input() set initialHigh(value: number) {
    this.highValue = value;
    this.lowValue = this.lowValue || 0;
  }

  @Output() value = new EventEmitter<number[]>();

  private lowValue?: number = undefined;
  public set low(value: number) {
    if (this.lowValue !== value) {
      this.lowValue = value;
      this.emitValues();
    }
  }
  public get low() {
    return this.lowValue || 0;
  }

  private highValue?: number = undefined;
  public set high(value: number) {
    if (this.highValue !== value) {
      this.highValue = value;
      this.emitValues();
    }
  }
  public get high() {
    return this.highValue || 0;
  }

  public readonly options: Options;

  constructor() {
    this.options = {
      floor: this.floor,
      ceil: this.ceil,
      animate: false,
      translate: value => value + this.currency
    };
  }

  ngOnInit() {
    if (this.lowValue !== undefined && this.highValue !== undefined) {
      this.emitValues();
    }
  }

  private emitValues() {
    this.value.emit([this.low, this.high]);
  }
}
