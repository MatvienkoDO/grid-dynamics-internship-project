import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotDealsMonthComponent } from './hot-deals-month.component';

describe('HotDealsMonthComponent', () => {
  let component: HotDealsMonthComponent;
  let fixture: ComponentFixture<HotDealsMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotDealsMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotDealsMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
