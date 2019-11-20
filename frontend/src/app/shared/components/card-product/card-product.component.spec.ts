import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockTranslatePipe } from '../../../testing/test/mock-translate.pipe';
import { AppModule } from 'src/app/app.module';
import { CardProductComponent } from './card-product.component';
import { CardProduct } from '../../models';
import { doesNotThrow } from 'assert';

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

  it('changeSize should change size$', (done) => {
    const stubSize = 'stub';
    component.changeSize(stubSize);
    component.size$.subscribe(value => {
      expect(value).toBe(stubSize);
      done();
    });
  });

  it('changeColor should change color$', (done) => {
    const stubColor = 'stub';
    component.changeColor(stubColor);
    component.color$.subscribe(value => {
      expect(value).toBe(stubColor);
      done();
    });
  });
});
