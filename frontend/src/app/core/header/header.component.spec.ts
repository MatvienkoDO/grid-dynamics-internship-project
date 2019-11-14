import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { MockTranslatePipe } from '../../testing/mock-translate.pipe'
import { AppModule } from 'src/app/app.module';
import { LocalizationService } from 'src/app/shared/services';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { CartComponentInner, FavouritesComponentInner } from 'src/app/shared/components';
import { ElementRef } from '@angular/core';



describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  const LocalizationServiceSpy = jasmine.createSpyObj('LocalizationService', ['setLocale', 'getLangs']);
  const MatDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
  const matDialogRefSpy = {
    afterClosed: function() {
      return of('result');
    }
  };
  MatDialogSpy.open.and.returnValue(matDialogRefSpy);

  const ElementRefSpy = {
    nativeElement: {
      querySelector: jasmine.createSpy()
    }
  };
  // jasmine.createSpyObj('ElementRef', {
  //   nativeElement: jasmine.createSpyObj('nativeElement', ['querySelector'])
  // });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [MockTranslatePipe],
      providers: [
        { provide: LocalizationService, useValue: LocalizationServiceSpy },
        { provide: MatDialog, useValue: MatDialogSpy },
        { provide: ElementRef, useValue: ElementRefSpy },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change language', () => {
    component.changeLanguage('en');
    expect(TestBed.get(LocalizationService).setLocale).toHaveBeenCalledWith('en');
  });

  it('should open cart modal window', () => {
    component.openCart();
    expect(TestBed.get(MatDialog).open).toHaveBeenCalledWith(CartComponentInner, {
      width: '950px'
    });
    matDialogRefSpy.afterClosed().subscribe((result) => {
      expect(result).toBe('result');
    });
  });

  it('should open favourites modal window', () => {
    component.openFavourites();
    expect(TestBed.get(MatDialog).open).toHaveBeenCalledWith(FavouritesComponentInner, {
      width: '550px'
    });
    matDialogRefSpy.afterClosed().subscribe((result) => {
      expect(result).toBe('result');
    });
  });

  it('should close by click on menu button', () => {
    component.onClickMenuItem();
    // FIX ME
    //expect(TestBed.get(ElementRef).nativeElement.querySelector).toHaveBeenCalledWith('.mobile-menu__btn');
  });

});
