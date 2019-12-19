import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProductSmallComponent } from './card-product-small.component';
import { AppModule } from 'src/app/app.module';

describe('CardProductSmallComponent', () => {
  let component: CardProductSmallComponent;
  let fixture: ComponentFixture<CardProductSmallComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    })
    .compileComponents();
    fixture = TestBed.createComponent(CardProductSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#showDetailsCb should emit event', () => {
    spyOn(component.showDetails, 'emit');
    component.showDetailsCb();

    expect(component.showDetails.emit).toHaveBeenCalled();
  });

  it('#addToCartCb should emit event', () => {
    spyOn(component.addToCart, 'emit');
    component.addToCartCb();

    expect(component.addToCart.emit).toHaveBeenCalled();
  });
});
