import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapPlaceComponent } from './map-place.component';

describe('MapPlaceComponent', () => {
  let component: MapPlaceComponent;
  let fixture: ComponentFixture<MapPlaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapPlaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
