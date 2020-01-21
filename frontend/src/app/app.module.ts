import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Ng5SliderModule } from 'ng5-slider';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import {
  MatButtonModule,
  MatDialogModule,
  MatInputModule,
  MatIconModule,
  MatTableModule,
  MatTabsModule,
  MatExpansionModule,
} from '@angular/material';

import { AppComponent } from './app.component';

import {
  AppRoutingModule,
  NotificationModule,
} from './modules';

import { I18nModule } from './modules/i18n/i18n.module';

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
  AboutComponent,
  ContactComponent,
  HotDealsComponent,
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
  SearchRequestComponent,
  AccountComponent,
  WelcomeModalComponent,
  FavouriteButtonComponent,
  TextFieldComponent,
  MapPlaceComponent,
  HotDealsWeekComponent,
  HotDealsMonthComponent,
} from './shared/components';

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
    SearchRequestComponent,
    WelcomeModalComponent,
    FavouriteButtonComponent,
    HotDealsComponent,
    AboutComponent,
    ContactComponent,
    TextFieldComponent,
    MapPlaceComponent,
    HotDealsWeekComponent,
    HotDealsMonthComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NotificationModule,
    Ng5SliderModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatTabsModule,
    MatExpansionModule,
    ShowHidePasswordModule,
    I18nModule,
  ],
  providers: [
    LocalizationInterceptor.provider,
    ErrorInterceptor.provider,
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    CartComponent,
    CartComponentInner,
    FavouritesComponent,
    FavouritesComponentInner,
    AccountComponent,
    WelcomeModalComponent,
  ]
})
export class AppModule { }
