import { TestBed } from '@angular/core/testing';

import { FavouritesService, LocalizationService, NotificationService} from '../';
import { localStorageFavouritesKey } from '../../constants/common.constants';
import { CardProduct } from '../../models'

describe('FavouritesService', () => {
  const LocalizationServiceSpy = 
  jasmine.createSpyObj('LocalizationService', ['getNotificationServiceMessage']);
  const infoSpy = jasmine.createSpyObj('NotificationService', ['info', 'warning']);

  const stubMessage = 'stub Message';
  LocalizationServiceSpy.getNotificationServiceMessage.and.returnValue(stubMessage);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FavouritesService,
        { provide: LocalizationService, useValue: LocalizationServiceSpy },
        { provide: NotificationService, useValue: infoSpy },
      ] 
    });
    localStorage.clear();
  });

  it('FavouritesService should be created', () => {
    const service: FavouritesService = TestBed.get(FavouritesService);
    expect(service).toBeTruthy();
  });

  it('#init should be defined', () => {
    expect(TestBed.get(FavouritesService)).toBeDefined();
  });

  it('#init should push empty array', (done) => {
    TestBed.get(FavouritesService).items$.subscribe(value => {
      expect(value).toEqual([]);
      done();
    });
  });

  it('#init should push value', (done) => {
    localStorage.setItem(localStorageFavouritesKey, '[1, 2, 3]')
    TestBed.get(FavouritesService).items$.subscribe(value => {
      expect(value).toEqual([1, 2, 3]);
      done();
    });
  });

  it('#addToFavourites should add new value', (done) => {
    const cardProduct: CardProduct = {
      id: '1',
      title: 'Title',
      quantity: 1,
      price: 100,
      imageUrl: 'url',
      size: 'm',
      color: 'Red',
    };
    const favouritesService = TestBed.get(FavouritesService);
    favouritesService.addToFavourites(cardProduct);
    favouritesService.items$.subscribe(value => {
      expect(value).toEqual([cardProduct]);
      done();
    });
  });

  it('#addToFavourites should not add existing value', (done) => {
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
    const cartService = TestBed.get(FavouritesService);
    cartService.addToFavourites(existingCardProduct);
    cartService.addToFavourites(newCardProduct);
    cartService.items$.subscribe(value => {
      expect(value.length).toBe(1);
      expect(value[0]).toBeDefined();
      expect(value[0]).toEqual(existingCardProduct);
      done();
    });
  });

  it('#addToFavourites should add new value with different properties', (done) => {
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
    const cartService = TestBed.get(FavouritesService);
    cartService.addToFavourites(existingCardProduct);
    cartService.addToFavourites(newCardProduct);
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
    const cartService = TestBed.get(FavouritesService);
    cartService.addToFavourites(existingCardProduct);
    cartService.deleteFromFavourites(existingCardProduct);
    expect(localStorage.getItem(localStorageFavouritesKey)).toEqual('[]');
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
    const cartService = TestBed.get(FavouritesService);
    cartService.addToFavourites(cardProduct1);
    cartService.addToFavourites(cardProduct2);
    cartService.deleteFromFavourites(cardProduct1);
    expect(localStorage.getItem(localStorageFavouritesKey)).toEqual(JSON.stringify([cardProduct2]));
    cartService.items$.subscribe(value => {
      expect(value.length).toBe(1);
      expect(value[0]).toEqual(cardProduct2);
      done();
    });
  });

  it('#clearFavourites should clear cart with 0 item', (done) => {
    const cartService = TestBed.get(FavouritesService);
    cartService.clearFavourites();
    expect(localStorage.getItem(localStorageFavouritesKey)).toEqual('[]');
    cartService.items$.subscribe(value => {
      expect(value.length).toBe(0);
      done();
    });
  });

  it('#clearFavourites should clear cart with 2 item', (done) => {
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
    const cartService = TestBed.get(FavouritesService);
    cartService.addToFavourites(cardProduct1);
    cartService.addToFavourites(cardProduct2);
    cartService.clearFavourites();
    expect(localStorage.getItem(localStorageFavouritesKey)).toEqual('[]');
    cartService.items$.subscribe(value => {
      expect(value.length).toBe(0);
      done();
    });
  });
});
