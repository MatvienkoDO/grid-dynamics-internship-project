import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsComponent implements OnInit {
  public productId$: Observable<string>;

  constructor(private readonly route: ActivatedRoute) { }

  ngOnInit() {
    this.productId$ = this.route.params
      .pipe(map(params => params['id']));
  }
}
