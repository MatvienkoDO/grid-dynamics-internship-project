import { NgModule, Provider, Injector } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Ng5SliderModule } from 'ng5-slider';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';

import { AppComponent } from './app.component';

import {
  AppRoutingModule,
  NotificationModule,
} from './modules';

import {
  HeaderComponent,
  FooterComponent,
  ErrorInterceptor,
  LocalizationInterceptor,
} from './core';

import {
  HomeComponent,
  ProductDetailsComponent,
  ProductsComponent,
} from './pages';

import {
  AdvertisementComponent,
  BestSalesComponent,
  CardProductComponent,
  CardProductSmallComponent,
  LoadingIndicatorComponent,
  NewArrivalsComponent,
  NewsLetterComponent,
  ProductShowComponent,
  SaleComponent,
  SliderComponent,
  RelatedProductsComponent,
  CartComponent,
  CartComponentInner,
  FavouritesComponent,
  ListSelectComponent,
  RangeSelectComponent,
  FavouritesComponentInner,
} from './shared/components';
import { LocalizationService } from './shared/services';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccountComponent } from './shared/components/account/account.component';

const translateModuleConfig = {
  loader: {
    provide: TranslateLoader,
    useFactory: (http: HttpClient) => new TranslateHttpLoader(http),
    deps: [HttpClient]
  }
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SliderComponent,
    CardProductComponent,
    AdvertisementComponent,
    SaleComponent,
    BestSalesComponent,
    CardProductSmallComponent,
    NewArrivalsComponent,
    NewsLetterComponent,
    ProductShowComponent,
    LoadingIndicatorComponent,
    HomeComponent,
    ProductDetailsComponent,
    RelatedProductsComponent,
    CartComponent,
    CartComponentInner,
    FavouritesComponent,
    ProductsComponent,
    ListSelectComponent,
    RangeSelectComponent,
    FavouritesComponentInner,
    AccountComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot(translateModuleConfig),
    NotificationModule,
    Ng5SliderModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatTabsModule,
  ],
  providers: [
    LocalizationInterceptor.provider,
    ErrorInterceptor.provider
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    CartComponent,
    CartComponentInner,
    FavouritesComponent,
    FavouritesComponentInner,
    AccountComponent,
  ]
})
export class AppModule { }
