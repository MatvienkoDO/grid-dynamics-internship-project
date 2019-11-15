import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { of } from 'rxjs';

import { MailService } from './mail.service';

describe('MailService', () => {
  const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);

  const expectedEmails = ['test@mail.ru', 'stub@gmail.com'];
  httpClientSpy.get.and.returnValue(of(expectedEmails));

  const postBody = JSON.stringify('test@mail.ru');
  const expectedResponseBody = JSON.stringify({id: '1a', email: 'test@mail.ru'});
  httpClientSpy.post.and.returnValue(of(expectedResponseBody));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MailService,
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    });
  });

  it('#MailService should be created', () => {
    const service: MailService = TestBed.get(MailService);
    expect(service).toBeTruthy();
  });

  it('#get should return expected emails', (done) => {
    const mailService = TestBed.get(MailService);
    mailService.get().subscribe(
      emails => expect(emails).toEqual(expectedEmails, 'expected emails'),
      done()
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('#post should return expected emails', (done) => {
    const mailService = TestBed.get(MailService);
    mailService.post(mailService.url ,postBody).subscribe(
      response => expect(response).toEqual(expectedResponseBody, 'expected rersponse'),
      done()
    );
    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
  });
});
