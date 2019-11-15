import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockTranslatePipe } from '../../../testing/test/mock-translate.pipe';
import { AppModule } from 'src/app/app.module';
import { CardProductComponent } from './card-product.component';
import { CardProduct } from '../../models';

describe('CardProductComponent', () => {
  let component: CardProductComponent;
  let fixture: ComponentFixture<CardProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [MockTranslatePipe],
    })
    .compileComponents();
    fixture = TestBed.createComponent(CardProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should change size', () => {

  });
});
