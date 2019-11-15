import { TestBed } from '@angular/core/testing';

import { NotificationService } from '../notification/notification.service';
import { LocalizationService } from '../localization/localization.service';
import { CartService } from './cart.service';
import { localStorageCartKey } from '../../constants/common.constants';
import { CardProduct } from '../../models';

describe('CartService', () => {
  const LocalizationServiceSpy = 
  jasmine.createSpyObj('LocalizationService', ['getNotificationServiceMessage']);
  const infoSpy = jasmine.createSpyObj('NotificationService', ['info', 'warning']);

  const stubMessage = 'stub Message';
  LocalizationServiceSpy.getNotificationServiceMessage.and.returnValue(stubMessage);

  beforeEach(() => {
    TestBed.configureTestingModule({ 
      providers: [
        CartService,
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
    localStorage.setItem(localStorageCartKey, '[1, 2, 3]')
    TestBed.get(CartService).items$.subscribe(value => {
      expect(value).toEqual([1, 2, 3]);
      done();
    });
  });

  it('#addToCart should add new value', (done) => {
    const cardProduct: CardProduct = {
      id: '1',
      title: 'Title',
      quantity: 1,
      price: 100,
      imageUrl: 'url',
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
      imageUrl: 'url',
      size: 'm',
      color: 'Red',
    };
    const newCardProduct: CardProduct = {
      id: '1',
      title: 'Title',
      quantity: 5,
      price: 100,
      imageUrl: 'url',
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
      imageUrl: 'url',
      size: 'm',
      color: 'Red',
    };
    const newCardProduct: CardProduct = {
      id: '2',
      title: 'Title',
      quantity: 5,
      price: 100,
      imageUrl: 'url',
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
      imageUrl: 'url',
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
      imageUrl: 'url',
      size: 'm',
      color: 'Red',
    };
    const cardProduct2: CardProduct = {
      id: '2',
      title: 'Title',
      quantity: 1,
      price: 100,
      imageUrl: 'url',
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
      imageUrl: 'url',
      size: 'm',
      color: 'Red',
    };
    const cardProduct2: CardProduct = {
      id: '2',
      title: 'Title',
      quantity: 1,
      price: 100,
      imageUrl: 'url',
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
      imageUrl: 'url',
      size: 'm',
      color: 'Red',
    };
    const cardProduct2: CardProduct = {
      id: '2',
      title: 'Title',
      quantity: 137,
      price: 100,
      imageUrl: 'url',
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
      imageUrl: 'url',
      size: 'm',
      color: 'Red',
    };
    const cardProduct2: CardProduct = {
      id: '2',
      title: 'Title',
      quantity: 137,
      price: 100,
      imageUrl: 'url',
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
      imageUrl: 'url',
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