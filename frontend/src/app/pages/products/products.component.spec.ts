import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { AppModule } from 'src/app/app.module';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService, CartService, FavouritesService } from 'src/app/shared/services';

xdescribe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  const ActivatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['queryParams']);
  const ProductsServiceSpy = jasmine.createSpyObj('ProductsService', ['getProductsByFilters']);
  const RouterSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
  const CartServiceSpy = jasmine.createSpyObj('CartService', ['addToCart']);
  const FavouritesServiceSpy = jasmine.createSpyObj('FavouritesService', ['addToFavourites']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        { provide: ActivatedRoute, useValue: ActivatedRouteSpy },
        { provide: ProductsService, useValue: ProductsServiceSpy },
        { provide: Router, useValue: RouterSpy },
        { provide: CartService, useValue: CartServiceSpy },
        { provide: FavouritesService, useValue: FavouritesServiceSpy },
      ],
    })
    .compileComponents();
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
