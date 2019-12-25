import { TestBed } from '@angular/core/testing';

import { ErrorsService } from './errors.service';
import { Error } from '../../models';
import { Observable } from 'rxjs';

describe('ErrorsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ErrorsService = TestBed.get(ErrorsService);
    expect(service).toBeTruthy();
  });

  it('#getCertainErrors should return Observable', () => {
    const service: ErrorsService = TestBed.get(ErrorsService);
    const target = Error.Target.LogIn;
    expect(service.getCertainErrors(target) instanceof Observable).toBeTruthy();
  });
});
