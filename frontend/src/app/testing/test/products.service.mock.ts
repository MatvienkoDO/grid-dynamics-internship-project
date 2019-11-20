import { Product, ProductResponse } from 'src/app/shared/models';
import { Observable } from 'rxjs';

export class MockProductsService {
  product1: Product = {
    id: 'test1',
    name: 'test1',
    description: 'test1',
    subtitle: 'test1',
    category: 'test1',
    brand: 'test1',
    price: 100,
    sizes: ['test1'],
    colors: ['test1'],
    images: ['test1'],
    sliderImage: 'slider1 image url',
  };
  product2: Product = {
    id: 'test2',
    name: 'test2',
    description: 'test2',
    subtitle: 'test2',
    category: 'test2',
    brand: 'test2',
    price: 100,
    sizes: ['test2'],
    colors: ['test2'],
    images: ['test2'],
    sliderImage: 'slider2 image url'
  };
  stubProductResponse = new ProductResponse(this.product1, 1);
  stubProductsResponse = new ProductResponse([this.product1, this.product2], 2);

  getProducts() {
    return new Observable(subscriber =>
      subscriber.next(this.stubProductsResponse)
    );
  }

  getProductsByFilters() {
    return this.getProducts();
  }

  getProductsForSlider() {
    return this.getProducts();
  }

  getProductById() {
    return new Observable(subscriber =>
      subscriber.next(this.stubProductResponse)
    );
  }

  getRelatedProducts() {
    return this.getProducts();
  }
}