import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductShowComponent } from './product-show.component';
import { AppModule } from 'src/app/app.module';
import { EventEmitter } from '@angular/core';

describe('ProductShowComponent', () => {
  let component: ProductShowComponent;
  let fixture: ComponentFixture<ProductShowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    })
    .compileComponents();
    fixture = TestBed.createComponent(ProductShowComponent);
    component = fixture.componentInstance;
    component.size$.next(undefined);
    component.images.push(
      {
        '1_1': '',
        '4_3': '',
        '16_9': '',
        'scale': '',
        'default': '',
      },
      {
        '1_1': '',
        '4_3': '',
        '16_9': '',
        'scale': '',
        'default': '',
      }
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set initialSize', (done) => {
    component.size$.subscribe(value => {
      expect(value).toBe(component.sizes[0]);
      done();
    });
  });

  it('changeSize should set new size', (done) => {
    component.changeSize('newSize');
    component.size$.subscribe(value => {
      expect(value).toBe('newSize');
      done();
    });
  });

  it('increaseQuantity should increase quantity', (done) => {
    component.increaseQuantity();
    component.quantity$.subscribe(value => {
      expect(value).toBe(2);
      done();
    });
  });

  it('decreaseQuantity should decrease quantity', (done) => {
    component.increaseQuantity();
    component.decreaseQuantity();
    component.quantity$.subscribe(value => {
      expect(value).toBe(1);
      done();
    });
  });

  it('decreaseQuantity should not decrease if quantity is less or equal than 1', (done) => {
    component.decreaseQuantity();
    component.quantity$.subscribe(value => {
      expect(value).toBe(1);
      done();
    });
  });

  it('changeImage should change current image', (done) => {
    component.changeImage(1);
    component.currentImage$.subscribe(value => {
      expect(value).toBe(1);
      done();
    });
  });

  it('prevImage should change current image', (done) => {
    component.changeImage(1);
    component.prevImage();
    component.currentImage$.subscribe(value => {
      expect(value).toBe(0);
      done();
    });
  });

  it('prevImage should not change current image if current equal to 0', (done) => {
    component.prevImage();
    component.currentImage$.subscribe(value => {
      expect(value).toBe(0);
      done();
    });
  });

  it('nextImage should change current image', (done) => {
    component.images = [{"1_1": "", "4_3": "", "16_9": "", "scale": "", "default": ""}, {"1_1": "", "4_3": "", "16_9": "", "scale": "", "default": ""}];
    component.nextImage();
    component.currentImage$.subscribe(value => {
      expect(value).toBe(1);
      done();
    });
  });
});
