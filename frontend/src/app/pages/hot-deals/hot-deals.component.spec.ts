import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotDealsComponent } from './hot-deals.component';
import { MockTranslatePipe } from '../../testing/test/mock-translate.pipe';
import { AppModule } from 'src/app/app.module';

describe('HotDealsComponent', () => {
  let component: HotDealsComponent;
  let fixture: ComponentFixture<HotDealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [ MockTranslatePipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
