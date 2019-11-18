import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderComponent } from './slider.component';
import { AppModule } from 'src/app/app.module';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

xdescribe('SliderComponent', () => {
  let component: SliderComponent;
  let fixture: ComponentFixture<SliderComponent>;

  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
  const sanitizerSpy = jasmine.createSpyObj('DomSanitizer', ['bypassSecurityTrustStyle', 'sanitize']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: DomSanitizer, useValue: sanitizerSpy },
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(SliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('#showDetails should call router.navigateByUrl', () => {
    const stubId = '1';
    component.showDetails(stubId);
    expect(routerSpy.navigateByUrl).toHaveBeenCalled();
  });

  it('#trustStyle should call sanitizer.bypassSecurityTrustStyle', () => {
    const stubStyle = 'stub';
    component.showDetails(stubStyle);
    expect(sanitizerSpy.bypassSecurityTrustStyle).toHaveBeenCalled();
  });
});
