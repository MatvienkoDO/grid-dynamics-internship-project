import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockTranslatePipe } from '../../../testing/mock-translate.pipe';
import { AppModule } from 'src/app/app.module';
import { CartComponent } from './cart.component';
import { CartService } from '../../services';
import { CardProduct } from '../../models';

fdescribe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  const CartServiceSpy = jasmine.createSpyObj('CartService', ['deleteFromCart', 'clearCart']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [MockTranslatePipe],
      providers: [
        { provide: CartService, useValue: CartServiceSpy },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete from cart', (done) => {
    const existingCardProduct: CardProduct = {
      id: '1',
      title: 'Title',
      quantity: 1,
      price: 100,
      size: 'm',
      color: 'Red',
    };
    const cartService = TestBed.get(CartService);
    cartService.deleteFromCart(existingCardProduct);
    cartService.items$.subscribe(value => {
      expect(value.length).toBe(0);
      done();
    });
  });
});
