import { TestBed } from '@angular/core/testing';
import { of, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductFilterService } from './product-filter.service';
import { ProductsService } from '../products/products.service';

xdescribe('ProductFilterService', () => {
  const ActivatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['queryParams']);
  ActivatedRouteSpy.queryParams.and.returnValue(
    new Observable(observer => {
      const urlParams = {
        param1: 'some',
        param2: 'params'
      };
      observer.next(urlParams);
      observer.complete();
    })
  );

  const ProductsServiceSpy = jasmine.createSpyObj('ProductsServiceSpy', ['getProductsByFilters']);

  const RouterSpy = jasmine.createSpyObj('RouterSpy', ['navigateByUrl']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductFilterService,
        { provide: ActivatedRoute, useValue: ActivatedRouteSpy },
        { provide: ProductsService, useValue: ProductsServiceSpy },
        { provide: Router, useValue: RouterSpy }, // TODO mock doesn't work
      ]
    });
  });

  it('should be created', () => {
    const service: ProductFilterService = TestBed.get(ProductFilterService);
    expect(service).toBeTruthy();
  });
  // TODO add new tests
});
