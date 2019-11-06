import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  // FIXME: hotfix of error in template
  public readonly showcontent = undefined;

  constructor() { }

  ngOnInit() {
  }
}
