import { TestBed } from '@angular/core/testing';

import { AccountModalService } from './account-modal.service';

describe('AccountModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccountModalService = TestBed.get(AccountModalService);
    expect(service).toBeTruthy();
  });
});
