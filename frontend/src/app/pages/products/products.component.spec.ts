import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { AppModule } from 'src/app/app.module';
import { CartService, FavouritesService } from 'src/app/shared/services';
import { CardProduct } from 'src/app/shared/models';
import { Observable, of } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { MockActivatedRoute } from '../product-details/product-details.component.spec';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  let route;

  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl', 'navigate']);
  const cartServiceSpy = jasmine.createSpyObj('CartService', ['addToCart']);
  const favouritesServiceSpy = jasmine.createSpyObj('FavouritesService', ['addToFavourites']);
  // const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['queryParams']);
  // activatedRouteSpy.queryParams.and.returnValue(of({
  //   search: 'adadad'
  // }));

  const activatedRouteSpy = {
    queryParams: of({
      search: 'adadad'
    })
  };


  beforeEach(() => {
    // /route = new MockActivatedRoute();
    // route.params = new Observable(subscriber => 
    //   subscriber.next({'id': '1'})
    // );
    // route.root = new MockActivatedRoute();
    // console.log(route);
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: CartService, useValue: cartServiceSpy },
        { provide: FavouritesService, useValue: favouritesServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#goToPdp should call router.navigateByUrl', () => {
    const stubId = 'stub';
    component.showDetails(stubId);
    expect(routerSpy.navigateByUrl).toHaveBeenCalled();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith(`/product/${stubId}`);
  });

  it('#addToCart should call cartService.addToCart', () => {
    const stubCard: CardProduct = {
      id: '1',
      title: 'title',
      quantity: 1,
      price: 100,
      imageUrl: 'url',
    };
    component.addToCart(stubCard);
    expect(cartServiceSpy.addToCart).toHaveBeenCalled();
    expect(cartServiceSpy.addToCart).toHaveBeenCalledWith(stubCard);
  });

  it('#addToFavourites should call favouritesService.addToFavourites', () => {
    const stubCard: CardProduct = {
      id: '1',
      title: 'title',
      quantity: 1,
      price: 100,
      imageUrl: 'url',
    };
    component.addToFavourites(stubCard);
    expect(favouritesServiceSpy.addToFavourites).toHaveBeenCalled();
    expect(favouritesServiceSpy.addToFavourites).toHaveBeenCalledWith(stubCard);
  });
});
