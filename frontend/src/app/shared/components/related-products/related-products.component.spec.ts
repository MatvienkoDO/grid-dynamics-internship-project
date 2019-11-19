import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedProductsComponent } from './related-products.component';
import { AppModule } from 'src/app/app.module';
import { Observable } from 'rxjs';
import { ProductResponse } from '../../models';

describe('RelatedProductsComponent', () => {
  let component: RelatedProductsComponent;
  let fixture: ComponentFixture<RelatedProductsComponent>;

  const stubProductResponse = new ProductResponse();
  stubProductResponse.data = [{
    id: 'test',
    name: 'test',
    description: 'test',
    subtitle: 'test',
    category: 'test',
    brand: 'test',
    price: 100,
    sizes: ['test'],
    colors: ['test'],
    images: ['test'],
  }];

  const productsServiceSpy = jasmine.createSpyObj('ProductsService', ['getRelatedProducts']);
  productsServiceSpy.getRelatedProducts.and.returnValue(new Observable(subscriber =>
    subscriber.next(stubProductResponse)
  ));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    })
    .compileComponents();
    fixture = TestBed.createComponent(RelatedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
