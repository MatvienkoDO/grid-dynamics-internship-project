import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProductSmallComponent } from './card-product-small.component';

describe('CardProductSmallComponent', () => {
  let component: CardProductSmallComponent;
  let fixture: ComponentFixture<CardProductSmallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardProductSmallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardProductSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
