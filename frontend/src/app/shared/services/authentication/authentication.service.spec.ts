import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { AuthenticationService } from './authentication.service';
import { apiHost } from 'src/environments/environment';
import { Observable } from 'rxjs';

describe('AuthenticationService', () => {

  const httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
  httpClientSpy.post.and.returnValue(new Observable());

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthenticationService,
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    });
  });

  it('should be created', () => {
    const service = TestBed.get(AuthenticationService);
    expect(service).toBeTruthy();
  });

  it('#currentUserValue should return', () => {
    const service = TestBed.get(AuthenticationService);
    expect(service.currentUserValue).toEqual(null);
  });

  it('#login should call http.post', () => {
    const service = TestBed.get(AuthenticationService);
    const stubEmail = 'stub';
    const stubPassword = 'stub';
    service.login(stubEmail, stubPassword);
    expect(httpClientSpy.post).toHaveBeenCalled();
  });

  it('#logout should return', () => {
    const service = TestBed.get(AuthenticationService);
    service.logout();
    expect(httpClientSpy.post).toHaveBeenCalled();
  });

  it('#signup should return', () => {
    const service = TestBed.get(AuthenticationService);
    const signupDto = {
      firstName: 'stub',
      lastName: 'stub',
      email: 'stub',
      password: 'stub',
    };
    service.signup(signupDto);
    expect(httpClientSpy.post).toHaveBeenCalled();
  });
});
