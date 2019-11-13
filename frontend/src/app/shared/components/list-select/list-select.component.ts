import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-list-select',
  templateUrl: './list-select.component.html',
  styleUrls: ['./list-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListSelectComponent implements OnInit {
  @Input() title = '';
  @Input() options: ListSelectComponent.Options = [];
  @Input('one-of-many') oneOfMany = true;

  @Output() values = new EventEmitter<string[]>();

  public readonly selected$ = new BehaviorSubject<string[]>([]);

  constructor() { }

  ngOnInit() { }

  click(value: string) {
    if (this.oneOfMany) {
      this.oneOfManyClick(value);
    } else {
      this.aFewOfManyClick(value);
    }
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
