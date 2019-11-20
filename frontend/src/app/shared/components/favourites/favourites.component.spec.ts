import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritesComponent, FavouritesComponentInner } from './favourites.component';
import { AppModule } from 'src/app/app.module';
import { FavouritesService } from '../../services';
import { CardProduct } from '../../models';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

describe('FavouritesComponent', () => {
  let component: FavouritesComponent;
  let fixture: ComponentFixture<FavouritesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    })
    .compileComponents();
    fixture = TestBed.createComponent(FavouritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('FavouritesComponentInner', () => {
  let component: FavouritesComponentInner;
  let fixture: ComponentFixture<FavouritesComponentInner>;

  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

  const favouritesServiceSpy = jasmine.createSpyObj('FavouritesService', [
    'deleteFromFavourites',
    'clearFavourites',
    'items$'
  ]);
  favouritesServiceSpy.items$ = new Observable(subscriber => {
    subscriber.next([
      {
        id: 'stub',
        title: 'stub',
        quantity: 1,
        price: 100,
        imageUrl: 'stub',
        size: 'stub',
        color: 'stub',
      }
    ]);
  });
  const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        { provide: FavouritesService, useValue: favouritesServiceSpy },
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: Router, useValue: routerSpy },
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(FavouritesComponentInner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deleteFromFavourites should call favouritesService.deleteFromFavourites', () => {
    const stubCard: CardProduct = {
      id: 'stub',
      title: 'stub',
      quantity: 1,
      price: 100,
      imageUrl: 'stub',
      size: 'stub',
      color: 'stub',
    };
    component.deleteFromFavourites(stubCard);
    expect(favouritesServiceSpy.deleteFromFavourites).toHaveBeenCalled();
  });

  it('clearCart should call favouritesService.clearFavourites and dialogRef.close', () => {
    component.clearCart();
    expect(favouritesServiceSpy.clearFavourites).toHaveBeenCalled();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('onNoClick should call dialogRef.close', () => {
    component.onNoClick();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('toPdp should call router.navigateByUrl and dialogRef.close', () => {
    const stubId = 'stub';
    component.toPdp(stubId);
    expect(routerSpy.navigateByUrl).toHaveBeenCalled();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith(`/product/${stubId}`);
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });
});