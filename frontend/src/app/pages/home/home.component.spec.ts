import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';
import { HomeComponent } from './home.component';
import { MockTranslatePipe } from '../../testing/test/mock-translate.pipe';
import { ProductsService } from 'src/app/shared/services';
import { of } from 'rxjs';
import { ProductResponse } from 'src/app/shared/models';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const productServiceSpy = jasmine.createSpyObj(
    'ProductsService',
    [
      'getProductsForSlider',
      'getProducts'
    ]
  );
  productServiceSpy.getProductsForSlider.and.returnValue(of({
    data: [],
  }));
  productServiceSpy.getProducts.and.returnValue(of(new ProductResponse()));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [ MockTranslatePipe ],
      providers: [
        { provide: ProductsService, useValue: productServiceSpy }
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
