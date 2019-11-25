import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-search-request[search-query]',
  templateUrl: './search-request.component.html',
  styleUrls: ['./search-request.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchRequestComponent implements OnInit {
  @Input('search-query') searchQuery: string = '';

  @Output() reset = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
}
