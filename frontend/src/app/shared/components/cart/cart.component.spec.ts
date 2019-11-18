import { ComponentFixture, TestBed } from '@angular/core/testing';
//import { MockTranslatePipe } from '../../../testing/mock-translate.pipe';
import { AppModule } from 'src/app/app.module';
import { CartComponentInner } from './cart.component';
import { CartService } from '../../services';
import { CardProduct } from '../../models';
import {  MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';

describe('CartComponentInner', () => {
  let component: CartComponentInner;
  let fixture: ComponentFixture<CartComponentInner>;
  const CartServiceSpy = jasmine.createSpyObj('CartService', ['deleteFromCart', 'clearCart']);
  CartServiceSpy.deleteFromCart.and.returnValue({ subscribe: () => {} });
  const MatDialogRefSpy = jasmine.createSpyObj('MatDialog', ['open']);

  CartServiceSpy.items$ = of([]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      //declarations: [MockTranslatePipe],
      providers: [
        { provide: CartService, useValue: CartServiceSpy },
        { provide: MatDialogRef, useValue: MatDialogRefSpy },
      ],
    })
    .compileComponents();
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
      imageUrl: 'url',
      size: 'm',
      color: 'Red',
    };
    component.deleteFromCart(existingCardProduct);
    expect(TestBed.get(CartService).deleteFromCart).toHaveBeenCalledWith(existingCardProduct);
  });
});
