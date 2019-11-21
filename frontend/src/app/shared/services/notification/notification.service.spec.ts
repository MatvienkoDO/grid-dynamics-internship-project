import { TestBed } from '@angular/core/testing';

import { NotifierService } from 'angular-notifier';

import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  const notifierServiceSpy = 
  jasmine.createSpyObj('NotifierService', ['notify']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NotificationService,
        { provide: NotifierService, useValue: notifierServiceSpy },
      ]
    })
  });

  it('#NotificationService should be created', () => {
    const service: NotificationService = TestBed.get(NotificationService);
    expect(service).toBeTruthy();
  });

  it('#success should call notify from NotifierService', () => {
    const service: NotificationService = TestBed.get(NotificationService);
    const stubMessage = 'stud';
    service.success(stubMessage);
    expect(notifierServiceSpy.notify).toHaveBeenCalled();
    expect(notifierServiceSpy.notify).toHaveBeenCalledWith('success', stubMessage);
  });

  it('#error should call notify from NotifierService', () => {
    const service: NotificationService = TestBed.get(NotificationService);
    const stubMessage = 'stud';
    service.error(stubMessage);
    expect(notifierServiceSpy.notify).toHaveBeenCalled();
    expect(notifierServiceSpy.notify).toHaveBeenCalledWith('error', stubMessage);
  });

  it('#warning should call notify from NotifierService', () => {
    const service: NotificationService = TestBed.get(NotificationService);
    const stubMessage = 'stud';
    service.warning(stubMessage);
    expect(notifierServiceSpy.notify).toHaveBeenCalled();
    expect(notifierServiceSpy.notify).toHaveBeenCalledWith('warning', stubMessage);
  });

  it('#info should call notify from NotifierService', () => {
    const service: NotificationService = TestBed.get(NotificationService);
    const stubMessage = 'stud';
    service.info(stubMessage);
    expect(notifierServiceSpy.notify).toHaveBeenCalled();
    expect(notifierServiceSpy.notify).toHaveBeenCalledWith('info', stubMessage);
  });
});
