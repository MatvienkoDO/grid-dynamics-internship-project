import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NotificationModule } from './modules/notification/notification.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
  HeaderComponent,
  FooterComponent,
} from './core';

import {
  HomeComponent,
  ProductDetailsComponent,
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NotificationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
