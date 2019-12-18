import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { SliderComponent } from './slider.component';
import { AppModule } from 'src/app/app.module';
import { ProductsService } from '../../services';

describe('SliderComponent', () => {
  let component: SliderComponent;
  let fixture: ComponentFixture<SliderComponent>;

  const productServiceSpy = jasmine.createSpyObj('ProductsService', ['getProductsForSlider']);
  productServiceSpy.getProductsForSlider.and.returnValue(of({
    data: [],
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        { provide: ProductsService, useValue: productServiceSpy }
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
});
