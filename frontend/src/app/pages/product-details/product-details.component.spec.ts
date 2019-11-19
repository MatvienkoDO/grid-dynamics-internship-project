import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ProductDetailsComponent } from '..';
import { AppModule } from 'src/app/app.module';
import { ProductsService } from 'src/app/shared/services';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;

  beforeEach(() => {
    const productsServiceMock = {
      getProductById: () => of({})
    };
    
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        { provide: ProductsService, useValue: productsServiceMock }
      ],
    })
    .compileComponents();
    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
