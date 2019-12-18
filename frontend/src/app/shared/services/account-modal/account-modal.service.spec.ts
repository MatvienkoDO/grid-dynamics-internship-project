import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';

import { AccountModalService } from './account-modal.service';
import { MatDialog } from '@angular/material';
import { AuthenticationService } from '../authentication/authentication.service';

describe('AccountModalService', () => {
  const MatDialogSpy = jasmine.createSpyObj('MatDialog', ['open', 'close']);
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
    const service: AccountModalService = TestBed.get(AccountModalService);
    expect(service).toBeTruthy();
  });
  // TODO add new tests
});
