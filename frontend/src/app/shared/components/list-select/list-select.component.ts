import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-list-select',
  templateUrl: './list-select.component.html',
  styleUrls: ['./list-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListSelectComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
