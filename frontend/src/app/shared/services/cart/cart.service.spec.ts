import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing'

import { TestBed } from '@angular/core/testing';


import { NotificationService } from '../notification/notification.service';
import { LocalizationService } from '../localization/localization.service';
import { localStorageCartKey } from '../../constants/common.constants';
import { CartService } from './cart.service';

describe('CartService', () => {
  beforeEach(() => {
//     TestBed.resetTestEnvironment();
// TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    TestBed.configureTestingModule({ 
      providers: [
        CartService,
        { provide: LocalizationService, useValue: {} },
        { provide: NotificationService, useValue: {} },
      ] 
    });
  });

  it('#init should be defined', () => {
    expect(TestBed.get(CartService)).toBeDefined();
  });

  it('#init should push empty array', (done) => {
    TestBed.get(CartService).items$.subscribe(value => {
      expect(value).toEqual([]);
      done();
    });
  });

  it('#init should push value', (done) => {
    localStorage.setItem(localStorageCartKey, '[1, 2, 3]')
    TestBed.get(CartService).items$.subscribe(value => {
      expect(value).toEqual([1, 2, 3]);
      done();
    });
  });
});