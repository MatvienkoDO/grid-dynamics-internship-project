import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestSalesComponent } from './best-sales.component';
import { AppModule } from 'src/app/app.module';

describe('BestSalesComponent', () => {
  let component: BestSalesComponent;
  let fixture: ComponentFixture<BestSalesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    })
    .compileComponents();
    fixture = TestBed.createComponent(BestSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
