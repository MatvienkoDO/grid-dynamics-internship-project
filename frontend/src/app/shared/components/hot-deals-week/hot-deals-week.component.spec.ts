import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotDealsWeekComponent } from './hot-deals-week.component';

describe('HotDealsWeekComponent', () => {
  let component: HotDealsWeekComponent;
  let fixture: ComponentFixture<HotDealsWeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotDealsWeekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotDealsWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
