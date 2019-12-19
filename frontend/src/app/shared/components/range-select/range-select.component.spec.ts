import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeSelectComponent } from './range-select.component';
import { AppModule } from 'src/app/app.module';

describe('RangeSelectComponent', () => {
  let component: RangeSelectComponent;
  let fixture: ComponentFixture<RangeSelectComponent>;

  const floor = 0;
  const ceil = 10000;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    })
    .compileComponents();
    fixture = TestBed.createComponent(RangeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return properly low', () => {
    expect(component.low).toBe(floor);
    component.low = 100;
    expect(component.low).toBe(100);
  });

  it('should return properly high', () => {
    expect(component.high).toBe(ceil);
    component.high = 100;
    expect(component.high).toBe(100);
  });

  it('should return properly initialLow', () => {
    expect(component.low).toBe(floor);
    component.initialLow = 100;
    expect(component.low).toBe(100);
    expect(component.high).toBe(ceil);
  });

  it('should return properly initialHigh', () => {
    expect(component.high).toBe(ceil);
    component.initialHigh = 100;
    expect(component.high).toBe(100);
    expect(component.low).toBe(floor);
  });

  it('#newHigh should set new high value', () => {
    const newHighInput = {
      value: 10
     };
    const newValue = 10;
    component.newHigh(newValue, newHighInput);
    expect(component.high).toEqual(newValue);
  });

  it('#newLow should set new low value', () => {
    const newLowInput = {
      value: 10
     };
    const newValue = 10;
    component.newLow(newValue, newLowInput);
    expect(component.low).toEqual(newValue);
  });
});
