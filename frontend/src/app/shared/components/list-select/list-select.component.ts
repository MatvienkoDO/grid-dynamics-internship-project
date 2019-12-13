import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-list-select',
  templateUrl: './list-select.component.html',
  styleUrls: ['./list-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListSelectComponent implements OnInit, OnChanges {
  @Input() title = '';
  @Input() options: ListSelectComponent.Options = [];
  @Input('one-of-many') oneOfMany = true;
  @Input() selected: string | string[] = [];

  @Output() values = new EventEmitter<string[]>();

  public readonly selected$ = new BehaviorSubject<string[]>([]);

  public panelOpenState = false;

  constructor() { }

  ngOnInit() {
    if (this.areOptionsSelected()) {
      this.panelOpenState = true;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selected) {
      const rawSelected = changes.selected.currentValue;
      const notFilteredSelected = Array.isArray(rawSelected)
        ? rawSelected
        : [rawSelected];

      const options = changes.options
        ? changes.options.currentValue
        : this.options;

      const optionsValues = options.map(({ value }) => value);

      const selected = notFilteredSelected.filter(value => optionsValues.includes(value));

      this.selected$.next(selected);
    }
  }

  click(value: string) {
    if (this.oneOfMany) {
      this.oneOfManyClick(value);
    } else {
      this.aFewOfManyClick(value);
    }
  }

  private areOptionsSelected(): boolean {
    return (Array.isArray(this.selected) && this.selected.length > 0) || (typeof (this.selected) === 'string' && this.selected !== '');
  }

  private oneOfManyClick(value: string) {
    const current: string | undefined = this.selected$.value[0];

    const newValues = current === value
      ? []
      : [value];
    this.selected$.next(newValues);
    this.values.emit(newValues);
  }

  private aFewOfManyClick(value: string) {
    const current = this.selected$.value;

    const newValues = current.indexOf(value) !== -1
      ? current.filter(v => v !== value)
      : current.concat([value]);

    this.selected$.next(newValues);
    this.values.emit(newValues);
  }
}

export namespace ListSelectComponent {
  export interface Option {
    title: string;
    value: string;
  }

  export type Options = Option[];
}
