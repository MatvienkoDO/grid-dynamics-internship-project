import { Component, OnInit, Input } from '@angular/core';
import { CardProductComponent } from 'src/app/shared/components/card-product/card-product.component';


@Component({
  selector: 'app-product-show',
  templateUrl: './product-show.component.html',
  styleUrls: ['./product-show.component.scss']
})
export class ProductShowComponent implements OnInit {
  @Input() model: CardProductComponent;  

  constructor() { }

  ngOnInit() {
  }

}
