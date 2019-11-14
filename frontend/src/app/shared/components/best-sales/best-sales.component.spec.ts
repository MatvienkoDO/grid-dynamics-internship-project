import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockTranslatePipe } from '../../../testing/mock-translate.pipe';
import { AppModule } from 'src/app/app.module';
import { of } from 'rxjs';
import { BestSalesComponent } from './best-sales.component';
import { ProductsService } from '../../services';
import { Product, CardProduct, ProductResponse } from 'src/app/shared/models';

describe('BestSalesComponent', () => {
  let component: BestSalesComponent;
  let fixture: ComponentFixture<BestSalesComponent>;
  const ProductsServiceSpy = jasmine.createSpyObj('ProductsService', ['getProducts']);
  ProductsServiceSpy.getProducts.and.returnValue(of(<ProductResponse>{
    data: [<Product>{id: '123'}],
    quantity: 1
  }));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [MockTranslatePipe],
      providers: [
        { provide: ProductsService, useValue: ProductsServiceSpy },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#init should have products', () => {
    expect(TestBed.get(ProductsService).getProducts).toHaveBeenCalledWith(0, 3);
    component.products$.subscribe(value => {
      expect(value).toEqual([<Product>{id: '123'}]);
      // done();
    });
  });
});
