import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedProductsComponent } from './related-products.component';
import { AppModule } from 'src/app/app.module';
import { Observable } from 'rxjs';
import { ProductResponse, CardProduct } from '../../models';
import { CartService, FavouritesService, ProductsService } from '../../services';
import { Router } from '@angular/router';

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
    images: [{"1_1": "", "4_3": "", "16_9": "", "scale": "", "default": ""}],
  }];

  const productsServiceSpy = jasmine.createSpyObj('ProductsService', ['getRelatedProducts']);
  productsServiceSpy.getRelatedProducts.and.returnValue(new Observable(subscriber =>
    subscriber.next(stubProductResponse)
  ));
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
  const cartServiceSpy = jasmine.createSpyObj('CartService', ['addToCart']);
  const favouriteServiceSpy = jasmine.createSpyObj('FavouritesService', ['addToFavourites']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        { provide: ProductsService, useValue: productsServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: CartService, useValue: cartServiceSpy },
        { provide: FavouritesService, useValue: favouriteServiceSpy }
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(RelatedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to pdp', () => {
    const stubId = 'stub';
    component.showDetails(stubId);
    expect(routerSpy.navigateByUrl).toHaveBeenCalled();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith(`/product/${stubId}`);
  });

  it('should add to cart', () => {
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

  it('should add to favourites', () => {
    const stubCard: CardProduct = {
      id: 'stub',
      title: 'stub',
      quantity: 1,
      price: 100,
      image: {"1_1": "", "4_3": "", "16_9": "", "scale": "", "default": ""},
      size: 'stub',
      color: 'stub',
    };
    component.addToFavorite(stubCard);
    expect(favouriteServiceSpy.addToFavourites).toHaveBeenCalled();
    expect(favouriteServiceSpy.addToFavourites).toHaveBeenCalledWith(stubCard);
  });
});
