import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsLetterComponent } from './news-letter.component';
import { AppModule } from 'src/app/app.module';
import { MailService } from '../../services';
import { of } from 'rxjs';

describe('NewsLetterComponent', () => {
  let component: NewsLetterComponent;
  let fixture: ComponentFixture<NewsLetterComponent>;

  const mailServiceSpy = jasmine.createSpyObj('MailService', ['post']);
  mailServiceSpy.post.and.returnValue(of({}));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        { provide: MailService, useValue: mailServiceSpy },
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(NewsLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#onSubmit should call mailService.post', () => {
    const stubEvent = new Event('stub');
    expect(component.loading).toBe(false);
    component.onSubmit(stubEvent);
    expect(mailServiceSpy.post).toHaveBeenCalled();
  });
});
