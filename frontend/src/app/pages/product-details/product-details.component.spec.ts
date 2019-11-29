import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ProductDetailsComponent } from '..';
import { AppModule } from 'src/app/app.module';
import { ProductsService, CartService, FavouritesService } from 'src/app/shared/services';
import { Observable } from 'rxjs';
import {Type} from '@angular/core';
import {ActivatedRoute,Route,ActivatedRouteSnapshot,UrlSegment,Params,Data, ParamMap } from '@angular/router';
import { MockProductsService } from 'src/app/testing/test/products.service.mock';
import { CardProduct } from 'src/app/shared/models';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;

  const cartServiceSpy = jasmine.createSpyObj('CartService', ['addToCart']);
  const favouritesServiceSpy = jasmine.createSpyObj('FavouritesService', ['addToFavourites']);

  let route;

  beforeEach(() => {
    route = new MockActivatedRoute();
    route.params = new Observable(subscriber => 
      subscriber.next({'id': '1'})
    );

    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        ProductDetailsComponent,
        { provide: CartService, useValue: cartServiceSpy },
        { provide: FavouritesService, useValue: favouritesServiceSpy },
        { provide: ProductsService, useValue: new MockProductsService() },
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('addToCart should call cartService.addToCart', () => {
    const stubCard: CardProduct = {
      id: 'stub',
      title: 'stub',
      quantity: 1,
      price: 100,
      image: {"1_1": "", "4_3": "", "16_9": "", "scale": "", "default": ""},
      size: 'stub',
      color: 'stub',
    };
    component.addToCart(stubCard);
    expect(cartServiceSpy.addToCart).toHaveBeenCalled();
    expect(cartServiceSpy.addToCart).toHaveBeenCalledWith(stubCard);
  });

  it('addToFavourites should call favouritesService.addToFavourites', () => {
    const stubCard: CardProduct = {
      id: 'stub',
      title: 'stub',
      quantity: 1,
      price: 100,
      image: {"1_1": "", "4_3": "", "16_9": "", "scale": "", "default": ""},
      size: 'stub',
      color: 'stub',
    };
    component.addToFavourites(stubCard);
    expect(favouritesServiceSpy.addToFavourites).toHaveBeenCalled();
    expect(favouritesServiceSpy.addToFavourites).toHaveBeenCalledWith(stubCard);
  });
});

export class MockActivatedRoute implements ActivatedRoute{
  paramMap: Observable<ParamMap>;
  queryParamMap: Observable<ParamMap>;
  snapshot : ActivatedRouteSnapshot;
  url : Observable<UrlSegment[]>;
  params : Observable<Params>;
  queryParams : Observable<Params>;
  fragment : Observable<string>;
  data : Observable<Data>;
  outlet : string;
  component : Type<any>|string;
  routeConfig : Route;
  root : ActivatedRoute;
  parent : ActivatedRoute;
  firstChild : ActivatedRoute;
  children : ActivatedRoute[];
  pathFromRoot : ActivatedRoute[];
  toString() : string{
      return "";
  };
}