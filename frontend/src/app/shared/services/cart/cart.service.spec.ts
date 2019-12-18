import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { NotificationService, LocalizationService, CartService } from '..';
import { localStorageCartKey } from '../../constants';
import { CardProduct } from '../../models';
import { Observable } from 'rxjs';

describe('CartService', () => {
  const LocalizationServiceSpy =
  jasmine.createSpyObj('LocalizationService', ['getNotificationServiceMessage']);
  const infoSpy = jasmine.createSpyObj('NotificationService', ['info', 'warning']);

  const stubMessage = 'stub Message';
  LocalizationServiceSpy.getNotificationServiceMessage.and.returnValue(stubMessage);

  const HttpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'patch', 'put']);
  HttpClientSpy.get.and.returnValue(new Observable());
  HttpClientSpy.patch.and.returnValue(new Observable());
  HttpClientSpy.put.and.returnValue(new Observable());

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CartService,
        { provide: HttpClient, useValue: HttpClientSpy },
        { provide: LocalizationService, useValue: LocalizationServiceSpy },
        { provide: NotificationService, useValue: infoSpy },
      ]
    });
    localStorage.clear();
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
    const items = [
      {
        id: 'test1',
        title: 'test1',
        quantity: 'test1',
        price: 100,
        size: 'test1',
        color: 'test1',
        image: [{
          "1_1": 'test1',
          "4_3": 'test1',
          "16_9": 'test1',
          "scale": 'test1',
          "default": 'test1'
        }],
      },
      {
        id: 'test2',
        title: 'test2',
        quantity: 'test2',
        price: 100,
        size: 'test2',
        color: 'test2',
        image: [{
          "1_1": 'test2',
          "4_3": 'test2',
          "16_9": 'test2',
          "scale": 'test2',
          "default": 'test2'
        }],
      },
      {
        id: 'test3',
        title: 'test3',
        quantity: 'test3',
        price: 100,
        size: 'test3',
        color: 'test3',
        image: [{
          "1_1": 'test3',
          "4_3": 'test3',
          "16_9": 'test3',
          "scale": 'test3',
          "default": 'test3'
        }],
      },
    ];
    localStorage.setItem(localStorageCartKey, JSON.stringify(items));
    TestBed.get(CartService).items$.subscribe(value => {
      expect(value).toEqual(items);
      done();
    });
  });

  it('#addToCart should add new value', (done) => {
    const cardProduct: CardProduct = {
      id: '1',
      title: 'Title',
      quantity: 1,
      price: 100,
      image: {
        '1_1': '',
        '4_3': '',
        '16_9': '',
        'scale': '',
        'default': '',
      },
      size: 'm',
      color: 'Red',
    };
    const cartService = TestBed.get(CartService);
    cartService.addToCart(cardProduct);
    cartService.items$.subscribe(value => {
      expect(value).toEqual([cardProduct]);
      done();
    });
  });

  it('#addToCart should add quantity value', (done) => {
    const existingCardProduct: CardProduct = {
      id: '1',
      title: 'Title',
      quantity: 1,
      price: 100,
      image: {
        '1_1': '',
        '4_3': '',
        '16_9': '',
        'scale': '',
        'default': '',
      },
      size: 'm',
      color: 'Red',
    };
    const newCardProduct: CardProduct = {
      id: '1',
      title: 'Title',
      quantity: 5,
      price: 100,
      image: {
        '1_1': '',
        '4_3': '',
        '16_9': '',
        'scale': '',
        'default': '',
      },
      size: 'm',
      color: 'Red',
    };
    const cartService = TestBed.get(CartService);
    cartService.addToCart(existingCardProduct);
    cartService.addToCart(newCardProduct);
    cartService.items$.subscribe(value => {
      expect(value.length).toBe(1);
      expect(value[0]).toBeDefined();
      expect(value[0].quantity).toEqual(6);
      done();
    });
  });

  it('#addToCart should add new value with different properties', (done) => {
    const existingCardProduct: CardProduct = {
      id: '1',
      title: 'Title',
      quantity: 1,
      price: 100,
      image: {
        '1_1': '',
        '4_3': '',
        '16_9': '',
        'scale': '',
        'default': '',
      },
      size: 'm',
      color: 'Red',
    };
    const newCardProduct: CardProduct = {
      id: '2',
      title: 'Title',
      quantity: 5,
      price: 100,
      image: {
        '1_1': '',
        '4_3': '',
        '16_9': '',
        'scale': '',
        'default': '',
      },
      size: 'm',
      color: 'Red',
    };
    const cartService = TestBed.get(CartService);
    cartService.addToCart(existingCardProduct);
    cartService.addToCart(newCardProduct);
    cartService.items$.subscribe(value => {
      expect(value.length).toBe(2);
      expect(value[0]).toBeDefined();
      expect(value[0]).toEqual(existingCardProduct);
      expect(value[1]).toBeDefined();
      expect(value[1]).toEqual(newCardProduct);
      done();
    });
  });

  it('#deleteFromCart should delete item', (done) => {
    const existingCardProduct: CardProduct = {
      id: '1',
      title: 'Title',
      quantity: 1,
      price: 100,
      image: {
        '1_1': '',
        '4_3': '',
        '16_9': '',
        'scale': '',
        'default': '',
      },
      size: 'm',
      color: 'Red',
    };
    const cartService = TestBed.get(CartService);
    cartService.addToCart(existingCardProduct);
    cartService.deleteFromCart(existingCardProduct);
    expect(localStorage.getItem(localStorageCartKey)).toEqual('[]');
    cartService.items$.subscribe(value => {
      expect(value.length).toBe(0);
      done();
    });
  });

  it('#deleteFromCart should delete specific item', (done) => {
    const cardProduct1: CardProduct = {
      id: '1',
      title: 'Title',
      quantity: 1,
      price: 100,
      image: {
        '1_1': '',
        '4_3': '',
        '16_9': '',
        'scale': '',
        'default': '',
      },
      size: 'm',
      color: 'Red',
    };
    const cardProduct2: CardProduct = {
      id: '2',
      title: 'Title',
      quantity: 1,
      price: 100,
      image: {
        '1_1': '',
        '4_3': '',
        '16_9': '',
        'scale': '',
        'default': '',
      },
      size: 'm',
      color: 'Red',
    };
    const cartService = TestBed.get(CartService);
    cartService.addToCart(cardProduct1);
    cartService.addToCart(cardProduct2);
    cartService.deleteFromCart(cardProduct1);
    expect(localStorage.getItem(localStorageCartKey)).toEqual(JSON.stringify([cardProduct2]));
    cartService.items$.subscribe(value => {
      expect(value.length).toBe(1);
      expect(value[0]).toEqual(cardProduct2);
      done();
    });
  });

  it('#clearCart should clear cart with 0 item', (done) => {
    const cartService = TestBed.get(CartService);
    cartService.clearCart();
    expect(localStorage.getItem(localStorageCartKey)).toEqual('[]');
    cartService.items$.subscribe(value => {
      expect(value.length).toBe(0);
      done();
    });
  });

  it('#clearCart should clear cart with 2 item', (done) => {
    const cardProduct1: CardProduct = {
      id: '1',
      title: 'Title',
      quantity: 1,
      price: 100,
      image: {
      '1_1': '',
      '4_3': '',
      '16_9': '',
      'scale': '',
      'default': '',
    },
      size: 'm',
      color: 'Red',
    };
    const cardProduct2: CardProduct = {
      id: '2',
      title: 'Title',
      quantity: 1,
      price: 100,
      image: {
      '1_1': '',
      '4_3': '',
      '16_9': '',
      'scale': '',
      'default': '',
    },
      size: 'm',
      color: 'Red',
    };
    const cartService = TestBed.get(CartService);
    cartService.addToCart(cardProduct1);
    cartService.addToCart(cardProduct2);
    cartService.clearCart();
    expect(localStorage.getItem(localStorageCartKey)).toEqual('[]');
    cartService.items$.subscribe(value => {
      expect(value.length).toBe(0);
      done();
    });
  });

  it('#increaseQuantity should increase quantity of existing specific item', (done) => {
    const cardProduct1: CardProduct = {
      id: '1',
      title: 'Title',
      quantity: 1,
      price: 100,
      image: {
      '1_1': '',
      '4_3': '',
      '16_9': '',
      'scale': '',
      'default': '',
    },
      size: 'm',
      color: 'Red',
    };
    const cardProduct2: CardProduct = {
      id: '2',
      title: 'Title',
      quantity: 137,
      price: 100,
      image: {
      '1_1': '',
      '4_3': '',
      '16_9': '',
      'scale': '',
      'default': '',
    },
      size: 'm',
      color: 'Red',
    };
    const cartService = TestBed.get(CartService);
    cartService.addToCart(cardProduct1);
    cartService.addToCart(cardProduct2);
    cartService.increaseQuantity(0);
    cartService.increaseQuantity(1);
    cartService.items$.subscribe(value => {
      expect(value.length).toBe(2);
      expect(value[0].quantity).toBe(2);
      expect(value[1].quantity).toBe(138);
      done();
    });
  });

  it('#decreaseQuantity should decrease quantity of existing specific item', (done) => {
    const cardProduct1: CardProduct = {
      id: '1',
      title: 'Title',
      quantity: 2,
      price: 100,
      image: {
      '1_1': '',
      '4_3': '',
      '16_9': '',
      'scale': '',
      'default': '',
    },
      size: 'm',
      color: 'Red',
    };
    const cardProduct2: CardProduct = {
      id: '2',
      title: 'Title',
      quantity: 137,
      price: 100,
      image: {
      '1_1': '',
      '4_3': '',
      '16_9': '',
      'scale': '',
      'default': '',
    },
      size: 'm',
      color: 'Red',
    };
    const cartService = TestBed.get(CartService);
    cartService.addToCart(cardProduct1);
    cartService.addToCart(cardProduct2);
    cartService.decreaseQuantity(0);
    cartService.decreaseQuantity(1);
    cartService.items$.subscribe(value => {
      expect(value.length).toBe(2);
      expect(value[0].quantity).toBe(1);
      expect(value[1].quantity).toBe(136);
      done();
    });
  });

  it('#decreaseQuantity should not decrease quantity if it equal to 1', (done) => {
    const cardProduct1: CardProduct = {
      id: '1',
      title: 'Title',
      quantity: 1,
      price: 100,
      image: {
        '1_1': '',
        '4_3': '',
        '16_9': '',
        'scale': '',
        'default': '',
      },
      size: 'm',
      color: 'Red',
    };
    const cartService = TestBed.get(CartService);
    cartService.addToCart(cardProduct1);
    cartService.decreaseQuantity(0);
    cartService.items$.subscribe(value => {
      expect(value.length).toBe(1);
      expect(value[0].quantity).toBe(1);
      done();
    });
  });
});
