import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { AppModule } from 'src/app/app.module';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { ElementRef } from '@angular/core';

import { AccountModalService } from 'src/app/shared/services/account-modal/account-modal.service';
import { CartComponentInner, FavouritesComponentInner } from 'src/app/shared/components';
import { MockTranslatePipe } from '../../testing/test/mock-translate.pipe';
import { LocalizationService } from 'src/app/shared/services';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  const LocalizationServiceSpy = jasmine.createSpyObj(
    'LocalizationService', ['setLocale', 'getLangs']
  );
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
  const accountModalSpy = jasmine.createSpyObj('AccountModalService', ['openAccountModal']);
  const MatDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
  const matDialogRefSpy = {
    afterClosed() {
      return of('result');
    }
  };
  MatDialogSpy.open.and.returnValue(matDialogRefSpy);

  const ElementRefSpy = {
    nativeElement: {
      querySelector: jasmine.createSpy()
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [MockTranslatePipe],
      providers: [
        { provide: LocalizationService, useValue: LocalizationServiceSpy },
        { provide: AccountModalService, useValue: accountModalSpy },
        // { provide: Router, routerSpy },
        { provide: MatDialog, useValue: MatDialogSpy },
        { provide: ElementRef, useValue: ElementRefSpy },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#changeLanguage should change language', () => {
    component.changeLanguage('en');
    expect(TestBed.get(LocalizationService).setLocale).toHaveBeenCalledWith('en');
  });

  it('#openCart should open cart modal window', () => {
    component.openCart();
    expect(TestBed.get(MatDialog).open).toHaveBeenCalledWith(CartComponentInner, {
      width: '950px'
    });
    matDialogRefSpy.afterClosed().subscribe((result) => {
      expect(result).toBe('result');
    });
  });

  it('#openFavourites should open favourites modal window', () => {
    component.openFavourites();
    expect(TestBed.get(MatDialog).open).toHaveBeenCalledWith(FavouritesComponentInner, {
      width: '550px'
    });
    matDialogRefSpy.afterClosed().subscribe((result) => {
      expect(result).toBe('result');
    });
  });

  it('#openAccount should open favourites modal window', () => {
    component.openAccount();
    expect(accountModalSpy.openAccountModal).toHaveBeenCalled();
  });

});
