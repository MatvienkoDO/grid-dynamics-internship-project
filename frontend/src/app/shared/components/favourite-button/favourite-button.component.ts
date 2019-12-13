import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-favourite-button',
  templateUrl: './favourite-button.component.html',
  styleUrls: ['./favourite-button.component.scss']
})
export class FavouriteButtonComponent implements OnInit {

  @Input() selected: boolean;
  @Output() selectedChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  public toggleSelected() {
    this.selected = !this.selected;
    this.selectedChange.emit(this.selected);
  }

}
