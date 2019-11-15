import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewArrivalsComponent } from './new-arrivals.component';
import { AppModule } from 'src/app/app.module';
import { CardProduct } from '../../models';
import { Router } from '@angular/router';
import { CartService, FavouritesService, NotificationService } from '../../services';

describe('NewArrivalsComponent', () => {
  let component: NewArrivalsComponent;
  let fixture: ComponentFixture<NewArrivalsComponent>;

  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
  const cartServiceSpy = jasmine.createSpyObj('CartService', ['addToCart']);
  const favouritesServiceSpy = jasmine.createSpyObj('FavouritesService', ['addToFavourites']);
  const notificationServiceSpy = jasmine.createSpyObj('NotificationService', ['warning']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: CartService, useValue: cartServiceSpy },
        { provide: FavouritesService, useValue: favouritesServiceSpy },
        { provide: NotificationService, useValue: notificationServiceSpy }
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(NewArrivalsComponent);
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
      imageUrl: 'url',
    };
    component.goToPdp(stubCard);
    expect(routerSpy.navigateByUrl).toHaveBeenCalled();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith(`/product/${stubCard.id}`);
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

  it('#notChosen should call notificationService.warning', () => {
    const studMessage = 'studMessage';
    component.notChosen(studMessage);
    expect(notificationServiceSpy.warning).toHaveBeenCalled();
    expect(notificationServiceSpy.warning).toHaveBeenCalledWith(studMessage);
  });
});
