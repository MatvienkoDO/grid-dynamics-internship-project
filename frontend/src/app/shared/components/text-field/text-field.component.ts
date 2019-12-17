import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss']
})
export class TextFieldComponent {
  @Input() public name?: string;
  @Input() public label?: string;
  @Input() public required = false;
  @Input() public type = 'text';
  @Input() public autocomplete = true;
  @Input() public formControlName?: string;
  @Input() public pristine = false;
  @Input() public errors: string[] = [];
}
