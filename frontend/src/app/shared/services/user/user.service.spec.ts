import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';

import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';

describe('UserService', () => {
  const HttpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  HttpClientSpy.get.and.returnValue(new Observable());

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        { provide: HttpClient, useValue: HttpClientSpy },
      ]
    });
  });

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  it('#getMe should call httpClient.get', () => {
    const service: UserService = TestBed.get(UserService);
    service.getMe();
    expect(HttpClientSpy.get).toHaveBeenCalled();
  });
});
