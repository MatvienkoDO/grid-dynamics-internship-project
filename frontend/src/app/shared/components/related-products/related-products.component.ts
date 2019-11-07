import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product } from 'src/app/shared/models';
import { ProductsService } from 'src/app/shared/services';

@Component({
  selector: 'app-related-products[id]',
  templateUrl: './related-products.component.html',
  styleUrls: ['./related-products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelatedProductsComponent implements OnInit {
  @Input('id') id: string;

  public products$: Observable<Product[]>;

  constructor(private readonly productsService: ProductsService) { }

  ngOnInit() {
    this.products$ = this.productsService.getRelatedProducts(this.id, 0, 4)
      .pipe(map(response => {
        if (response && Array.isArray(response.data)) {
          return response.data;
        }

        throw 'incorrect data';
      }));
  }
}
