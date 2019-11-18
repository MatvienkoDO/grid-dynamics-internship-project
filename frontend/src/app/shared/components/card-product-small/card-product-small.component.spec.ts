import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProductSmallComponent } from './card-product-small.component';
import { AppModule } from 'src/app/app.module';

describe('CardProductSmallComponent', () => {
  let component: CardProductSmallComponent;
  let fixture: ComponentFixture<CardProductSmallComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    })
    .compileComponents();
    fixture = TestBed.createComponent(CardProductSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
