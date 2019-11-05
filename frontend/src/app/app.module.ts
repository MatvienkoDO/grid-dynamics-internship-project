import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
  HeaderComponent,
  FooterComponent,
} from './core';

import {
  HomeComponent,
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
