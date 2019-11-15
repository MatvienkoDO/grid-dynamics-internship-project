import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { from } from 'rxjs';

import { ProductsService } from './products.service';
import { Product, Filter } from '../../models'

describe('ProductsService', () => {
  const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);

  const product1: Product = {
    id: '1',
    name: 'product 1',
    description: 'desscription 1',
    subtitle: 'subtitle 1',
    category: 'category 1',
    brand: 'brand 1',
    price: 1,
    sizes: ['s', 'm'],
    colors: ['Red', 'Blue'],
    images: []
  };
  const product2: Product = {
    id: '2',
    name: 'product 2',
    description: 'desscription 2',
    subtitle: 'subtitle 2',
    category: 'category 2',
    brand: 'brand 2',
    price: 2,
    sizes: ['s', 'm'],
    colors: ['Red', 'Blue'],
    images: []
  };
  const expectedProducts = [
    product1, product2
  ];
  httpClientSpy.get.and.returnValue(from(expectedProducts));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductsService,
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    });
  });

  it('#ProductsService should be created', () => {
    const service: ProductsService = TestBed.get(ProductsService);
    expect(service).toBeTruthy();
  });

  it('#getProducts should call Http get', () => {
    const service: ProductsService = TestBed.get(ProductsService);
    const response = service.getProducts();
    expect(httpClientSpy.get).toHaveBeenCalled();
  });

  it('#getProductsByFilters should call Http get', () => {
    const service: ProductsService = TestBed.get(ProductsService);
    const filter: Filter = {
      category: 'Women',
      minPrice: 100,
      maxPrice: 150,
      sizes: ['s', 'm'],
      brands: ['Reebok'],
      search: 'Track Jacket',
    }
    const response = service.getProductsByFilters(0, 0, filter);
    expect(httpClientSpy.get).toHaveBeenCalled();
  });

  it('#getProductsForSlider should call Http get', () => {
    const service: ProductsService = TestBed.get(ProductsService);
    const response = service.getProductsForSlider();
    expect(httpClientSpy.get).toHaveBeenCalled();
  });

  it('#getProductById should call Http get', () => {
    const service: ProductsService = TestBed.get(ProductsService);
    const response = service.getProductById('1');
    expect(httpClientSpy.get).toHaveBeenCalled();
  });
});
