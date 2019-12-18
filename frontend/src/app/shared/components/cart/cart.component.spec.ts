import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';
import { CartComponentInner, CartComponent } from './cart.component';
import { CartService } from '../../services';
import { CardProduct } from '../../models';
import { of } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';

describe('CartComponentInner', () => {
  let component: CartComponentInner;
  let fixture: ComponentFixture<CartComponentInner>;
  const CartServiceSpy = jasmine.createSpyObj('CartService', [
    'deleteFromCart',
    'clearCart',
    'increaseQuantity',
    'decreaseQuantity',
  ]);
  CartServiceSpy.deleteFromCart.and.returnValue({ subscribe: () => {} });

  const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

  CartServiceSpy.items$ = of([]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        { provide: CartService, useValue: CartServiceSpy },
        { provide: MatDialogRef, useValue: dialogRefSpy },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponentInner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete from cart', () => {
    const existingCardProduct: CardProduct = {
      id: '1',
      title: 'Title',
      quantity: 1,
      price: 100,
      image: {"1_1": "", "4_3": "", "16_9": "", "scale": "", "default": ""},
      size: 'm',
      color: 'Red',
    };
    component.deleteFromCart(existingCardProduct);
    expect(CartServiceSpy.deleteFromCart).toHaveBeenCalledWith(existingCardProduct);
  });

  it('clearCart should call cartService.clearCart and dialogRef.close', () => {
    component.clearCart();
    expect(CartServiceSpy.clearCart).toHaveBeenCalled();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('onNoClick should call dialogRef.close', () => {
    component.onNoClick();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('increaseQuantity should call cartService.increaseQuantity', () => {
    const stubIndex = 1;
    component.increaseQuantity(stubIndex);
    expect(CartServiceSpy.increaseQuantity).toHaveBeenCalled();
    expect(CartServiceSpy.increaseQuantity).toHaveBeenCalledWith(stubIndex);
  });

  it('decreaseQuantity should call cartService.decreaseQuantity', () => {
    const stubIndex = 1;
    component.decreaseQuantity(stubIndex);
    expect(CartServiceSpy.decreaseQuantity).toHaveBeenCalled();
    expect(CartServiceSpy.decreaseQuantity).toHaveBeenCalledWith(stubIndex);
  });
});
