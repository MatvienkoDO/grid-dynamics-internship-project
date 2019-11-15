import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockTranslatePipe } from '../../../testing/mock-translate.pipe';
import { AppModule } from 'src/app/app.module';
import { of } from 'rxjs';
import { BestSalesComponent } from './best-sales.component';
import { ProductsService, CartService } from '../../services';
import { Product, CardProduct, ProductResponse } from 'src/app/shared/models';
import { Router } from '@angular/router';

describe('BestSalesComponent', () => {
  let component: BestSalesComponent;
  let fixture: ComponentFixture<BestSalesComponent>;
  const ProductsServiceSpy = jasmine.createSpyObj('ProductsService', ['getProducts']);
  ProductsServiceSpy.getProducts.and.returnValue(of(<ProductResponse>{
    data: [<Product>{ id: '123' }],
    quantity: 1
  }));
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
  const CartServiceSpy = jasmine.createSpyObj('CartService', ['addToCart']);

  beforeEach(async(() => {
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
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#init should have products', () => {
    expect(TestBed.get(ProductsService).getProducts).toHaveBeenCalledWith(0, 3);
    component.products$.subscribe(value => {
      expect(value).toEqual([<Product>{ id: '123' }]);
    });
  });

  it('should navigate to pdp', () => {
    const productInfo: CardProduct = {
      id: '1',
      title: 'Title',
      quantity: 5,
      price: 100,
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
      size: 'm',
      color: 'Red',
    };

    const cartService = TestBed.get(CartService);
    expect(component.addProductToCart(productInfo)).toEqual(cartService.addToCart(productInfo));
    });
});
