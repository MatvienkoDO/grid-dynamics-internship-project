import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeSelectComponent } from './range-select.component';

describe('RangeSelectComponent', () => {
  let component: RangeSelectComponent;
  let fixture: ComponentFixture<RangeSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RangeSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
