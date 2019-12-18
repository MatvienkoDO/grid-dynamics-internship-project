import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { AppModule } from 'src/app/app.module';
import { HotDealsMonthComponent } from './hot-deals-month.component';
import { MockTranslatePipe } from '../../../testing/test/mock-translate.pipe';
import { ProductsService, CartService } from '../../services';
import { Product, CardProduct, ProductResponse } from 'src/app/shared/models';

describe('HotDealsMonthComponent', () => {
  let component: HotDealsMonthComponent;
  let fixture: ComponentFixture<HotDealsMonthComponent>;
  const ProductsServiceSpy = jasmine.createSpyObj('ProductsService', ['getProducts']);
  ProductsServiceSpy.getProducts.and.returnValue(of(<ProductResponse> {
    data: [<Product> { id: '123' }],
    quantity: 1
  }));
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
  const CartServiceSpy = jasmine.createSpyObj('CartService', ['addToCart']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [MockTranslatePipe],
      providers: [
        { provide: ProductsService, useValue: ProductsServiceSpy },
        { provide: CartService, useValue: CartServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    })

      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotDealsMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should navigate to pdp', () => {
  const productInfo: CardProduct = {
    id: '1',
    title: 'Title',
    quantity: 5,
    price: 100,
    image: {'1_1': '', '4_3': '', '16_9': '', scale: '', default: ''},
    size: 'm',
    color: 'Red',
  };

  component.showDetails(productInfo);
  expect(TestBed.get(Router).navigateByUrl).toHaveBeenCalledWith('/product/' + productInfo.id);
});

  it('should be in cart', () => {
  const productInfo: CardProduct = {
    id: '1',
    title: 'Title',
    quantity: 5,
    price: 100,
    image: {'1_1': '', '4_3': '', '16_9': '', scale: '', default: ''},
    size: 'm',
    color: 'Red',
  };

  const cartService = TestBed.get(CartService);
  expect(component.addProductToCart(productInfo)).toEqual(cartService.addToCart(productInfo));
  });
});

