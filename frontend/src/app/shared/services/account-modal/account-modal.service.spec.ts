import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';

import { AccountModalService } from './account-modal.service';
import { MatDialog } from '@angular/material';
import { AuthenticationService } from '../authentication/authentication.service';

describe('AccountModalService', () => {
  let service: AccountModalService;

  const MatDialogSpy = jasmine.createSpyObj('MatDialog', ['open', 'close', 'pop', 'push']);
  MatDialogSpy.open.and.returnValue({
    value: '',
    close() {},
  });
  const AuthenticationServiceSpy = jasmine.createSpyObj('AuthenticationService', ['currentUser']);
  AuthenticationServiceSpy.currentUser.and.returnValue(new Observable());

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AccountModalService,
        { provide: MatDialog, useValue: MatDialogSpy },
        { provide: AuthenticationService, useValue: AuthenticationServiceSpy },
      ]
    });
  });

  it('should be created', () => {
    service = TestBed.get(AccountModalService);
    expect(service).toBeTruthy();
  });
  // TODO add new tests

  it('#openLoginSignup should callauthService and dialog', () => {
    service = TestBed.get(AccountModalService);
    service.openLoginSignup();
    expect(MatDialogSpy.open).toHaveBeenCalled();
  });

  it('#openWelcomeDialog should callauthService and dialog', () => {
    service = TestBed.get(AccountModalService);
    service.openWelcomeDialog();
    expect(MatDialogSpy.open).toHaveBeenCalled();
  });
});
