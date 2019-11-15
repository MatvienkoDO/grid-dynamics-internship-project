import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsLetterComponent } from './news-letter.component';
import { AppModule } from 'src/app/app.module';

describe('NewsLetterComponent', () => {
  let component: NewsLetterComponent;
  let fixture: ComponentFixture<NewsLetterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    })
    .compileComponents();
    fixture = TestBed.createComponent(NewsLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
