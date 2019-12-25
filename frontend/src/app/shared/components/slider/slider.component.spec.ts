import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { SliderComponent } from './slider.component';
import { AppModule } from 'src/app/app.module';
import { ProductsService, CartService } from '../../services';

describe('SliderComponent', () => {
  let component: SliderComponent;
  let fixture: ComponentFixture<SliderComponent>;

  const productServiceSpy = jasmine.createSpyObj('ProductsService', ['getProductsForSlider']);
  productServiceSpy.getProductsForSlider.and.returnValue(of({
    data: [],
  }));

  const cartServiceSpy = jasmine.createSpyObj('CartService', ['addToCart']);

  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

  const sanitizerSpy = jasmine.createSpyObj('DomSanitizer',['bypassSecurityTrustStyle', 'sanitize']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        { provide: ProductsService, useValue: productServiceSpy },
        { provide: CartService, useValue: cartServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: DomSanitizer, useValue: sanitizerSpy },
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(SliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#changeSlide should change slide on next', () => {
    const newCurrent = 1;
    expect(component.current$.getValue()).toBe(0);
    component.changeSlide(newCurrent);
    expect(component.current$.getValue()).toBe(newCurrent);
  });

  it('#orderProduct should call cartService.addToCart', () => {
    const productId = '1';
    const productTitle = 'title';
    const productPrice = 100;
    const image = {
        '1_1': '',
        '16_9': '',
        '4_3': '',
        'scale': '',
        'default': '',
    };
    const size = 'm';
    const color = 'red';
    component.orderProduct(productId, productTitle, productPrice, image, size, color);
    expect(cartServiceSpy.addToCart).toHaveBeenCalled();
    expect(cartServiceSpy.addToCart).toHaveBeenCalledWith({
      id: productId,
      title: productTitle,
      price: productPrice,
      quantity: 1,
      image,
      size,
      color,
    });
  });

  it('#showDetails should call router.navigateByUrl', () => {
    const stubId = '1';
    component.showDetails(stubId);
    expect(routerSpy.navigateByUrl).toHaveBeenCalled();
  });

  it('#trustStyle should call sanitizer.bypassSecurityTrustStyle', () => {
    const stubStyle = 'stub';
    component.trustStyle(stubStyle);
    expect(sanitizerSpy.bypassSecurityTrustStyle).toHaveBeenCalled();
  });
});
