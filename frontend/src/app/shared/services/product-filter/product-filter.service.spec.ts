import { TestBed } from '@angular/core/testing';

import { ProductFilterService } from './product-filter.service';

describe('ProductFilterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductFilterService = TestBed.get(ProductFilterService);
    expect(service).toBeTruthy();
  });
});
