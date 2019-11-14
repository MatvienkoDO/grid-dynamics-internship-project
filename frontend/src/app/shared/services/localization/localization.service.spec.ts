import { TestBed } from '@angular/core/testing';

import { TranslateService } from '@ngx-translate/core';

import { LocalizationService } from './localization.service';
import { localStorageLocaleKey } from '../../constants/common.constants';

describe('LocalizationService', () => {
  const translateServiceSpy = 
  jasmine.createSpyObj('TranslateService', [
    'getNotificationServiceMessage',
    'addLangs',
    'setDefaultLang',
    'getLangs',
    'getLocale',
    'use'
  ]);
  const stubLangs = ['en', 'ru'];
  translateServiceSpy.getLangs.and.returnValue(stubLangs);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LocalizationService,
        { provide: TranslateService, useValue: translateServiceSpy },
      ]
    });
    localStorage.clear();

    spyOn(location, 'reload').and.callFake(function(){});
  });

  it('LocalizationService should be created', () => {
    const service: LocalizationService = TestBed.get(LocalizationService);
    expect(service).toBeTruthy();
  });

  it('#LocalizationService should be created with default locale', () => {
    const localizationService = TestBed.get(LocalizationService);
    expect(localizationService.getLocale()).toBe('en');
  });

  it('#getLangs should return array of languages', () => {
    const localizationService = TestBed.get(LocalizationService);
    const langs = localizationService.getLangs();
    expect(langs.length).toBe(2);
    expect(langs).toEqual(stubLangs);
  });

  it('#getLocale', () => {
    const localizationService = TestBed.get(LocalizationService);
    const locale = localizationService.getLocale();
    expect(locale).toBeTruthy();
    expect(typeof locale).toBe('string');
    expect(locale).toBe('en');
  });

  it('#setLocale should set new locale', () => {
    const localizationService = TestBed.get(LocalizationService);
    const newLocale = 'ru';
    localizationService.setLocale(newLocale);
    expect(localizationService.getLocale()).toBe(newLocale);
  });

  it('#setLocale should set new locale in localStorage', () => {
    const localizationService = TestBed.get(LocalizationService);
    const newLocale = 'ru';
    localizationService.setLocale(newLocale);
    expect(localStorage.getItem(localStorageLocaleKey)).toBe(newLocale);
  });

  it('#getNotificationServiceMessage should return correct value', () => {
    const localizationService = TestBed.get(LocalizationService);
    let message = localizationService.getNotificationServiceMessage('addToCart');
    expect(message).toBe('has been added');
    message = localizationService.getNotificationServiceMessage('deleteFromCart');
    expect(message).toBe('has been removed');
    const newLocale = 'ru';
    localizationService.setLocale(newLocale);
    message = localizationService.getNotificationServiceMessage('addToCart');
    expect(message).toBe('в корзине');
    message = localizationService.getNotificationServiceMessage('deleteFromCart');
    expect(message).toBe('удален из корзины');
  });
});
