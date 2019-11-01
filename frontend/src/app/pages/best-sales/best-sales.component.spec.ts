import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestSalesComponent } from './best-sales.component';

describe('BestSalesComponent', () => {
  let component: BestSalesComponent;
  let fixture: ComponentFixture<BestSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestSalesComponent ]
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
});
