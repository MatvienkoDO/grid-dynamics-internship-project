import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'app-sale[percent]',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SaleComponent implements OnInit {
  @Input() public readonly percent: number;

  constructor() { }

  ngOnInit() {
  }
}
