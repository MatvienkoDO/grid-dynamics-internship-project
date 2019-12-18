import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteButtonComponent } from './favourite-button.component';
import { AppModule } from 'src/app/app.module';

describe('FavouriteButtonComponent', () => {
  let component: FavouriteButtonComponent;
  let fixture: ComponentFixture<FavouriteButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouriteButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#toggleSelected should toggle selected property', () => {
    component.selected = true;
    expect(component.selected).toBeTruthy();
    component.toggleSelected();
    expect(component.selected).toBe(false);
  });
});
