import { TestBed } from '@angular/core/testing';
import { of, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductFilterService } from './product-filter.service';
import { ProductsService } from '../products/products.service';
import { MockActivatedRoute } from 'src/app/pages/product-details/product-details.component.spec';

describe('ProductFilterService', () => {
  // const ActivatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['queryParams']);
  // ActivatedRouteSpy.queryParams.and.returnValue(
  //   new Observable(observer => {
  //     const urlParams = {
  //       param1: 'some',
  //       param2: 'params'
  //     };
  //     observer.next(urlParams);
  //     observer.complete();
  //   })
  // );
  const ActivatedRouteSpy = {
    queryParams: of({
      search: 'adadad'
    })
  };

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

  it('#changeLoading should change loading', (done) => {
    const trueValue = true;
    const service: ProductFilterService = TestBed.get(ProductFilterService);
    service.changeLoading(trueValue);
    service.loading$.subscribe(value => {
      expect(value).toBe(trueValue);
      done();
    });
  });

  it('#changeLoading should change loading', (done) => {
    const falseValue = false;
    const service: ProductFilterService = TestBed.get(ProductFilterService);
    service.changeLoading(falseValue);
    service.loading$.subscribe(value => {
      expect(value).toBe(falseValue);
      done();
    });
  });

  it('#createQueryFromUrlQuery should return object', () => {
    const service: ProductFilterService = TestBed.get(ProductFilterService);
    expect(typeof service.createQueryFromUrlQuery({}) === 'object').toBeTruthy();
  });

  it('#createNewUrl should return string', () => {
    const service: ProductFilterService = TestBed.get(ProductFilterService);
    expect(typeof service.createNewUrl({filter: {}, paging: {}}) === 'string').toBeTruthy();
  });

  it('#createNewUrl should call router.navigateByUrl', () => {
    const service: ProductFilterService = TestBed.get(ProductFilterService);
    service.resetSearchQuery();
    expect(RouterSpy.navigateByUrl).toHaveBeenCalled();
  });
});
