import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { AppModule } from 'src/app/app.module';
import { MockTranslatePipe } from '../../../testing/test/mock-translate.pipe';
import { ProductsService,
        CartService,
        NotificationService,
        FavouritesService } from '../../services';
import { Product, CardProduct, ProductResponse } from 'src/app/shared/models';


import { HotDealsWeekComponent } from './hot-deals-week.component';

describe('HotDealsWeekComponent', () => {
  let component: HotDealsWeekComponent;
  let fixture: ComponentFixture<HotDealsWeekComponent>;
  const ProductsServiceSpy = jasmine.createSpyObj('ProductsService', ['getProductsForMonth']);
  ProductsServiceSpy.getProductsForMonth.and.returnValue(of(<ProductResponse>{
    data: [<Product>{ id: '123' }],
    quantity: 1
  }));
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
  const CartServiceSpy = jasmine.createSpyObj('CartService', ['addToCart']);
  const favouritesServiceSpy = jasmine.createSpyObj('FavouritesService', ['addToFavourites']);
  const notificationServiceSpy = jasmine.createSpyObj('NotificationService', ['warning', 'error']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [MockTranslatePipe],
      providers: [
        { provide: ProductsService, useValue: ProductsServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: CartService, useValue: CartServiceSpy },
        { provide: FavouritesService, useValue: favouritesServiceSpy },
        { provide: NotificationService, useValue: notificationServiceSpy }
      ],
    })

      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotDealsWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#goToPdp should call router.navigateByUrl', () => {
    const stubCard: CardProduct = {
      id: '1',
      title: 'title',
      quantity: 1,
      price: 100,
      image: {"1_1": "", "4_3": "", "16_9": "", "scale": "", "default": ""},
    };
    component.goToPdp(stubCard);
    expect(routerSpy.navigateByUrl).toHaveBeenCalled();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith(`/product/${stubCard.id}`);
  });

  it('should be in cart', () => {
    const productInfo: CardProduct = {
      id: '1',
      title: 'Title',
      quantity: 5,
      price: 100,
      image: { '1_1': '', '4_3': '', '16_9': '', 'scale': '', 'default': '' },
      size: 'm',
      color: 'Red',
    };

    const cartService = TestBed.get(CartService);
    expect(component.addToCart(productInfo)).toEqual(cartService.addToCart(productInfo));
  });

  it('#addToFavourites should call favouritesService.addToFavourites', () => {
    const stubCard: CardProduct = {
      id: '1',
      title: 'title',
      quantity: 1,
      price: 100,
      image: {"1_1": "", "4_3": "", "16_9": "", "scale": "", "default": ""},
    };
    component.addToFavourites(stubCard);
    expect(favouritesServiceSpy.addToFavourites).toHaveBeenCalled();
    expect(favouritesServiceSpy.addToFavourites).toHaveBeenCalledWith(stubCard);
  });

  it('#notChosen should call notificationService.warning', () => {
    const studMessage = 'studMessage';
    component.notChosen(studMessage);
    expect(notificationServiceSpy.warning).toHaveBeenCalled();
    expect(notificationServiceSpy.warning).toHaveBeenCalledWith(studMessage);
  });
});
