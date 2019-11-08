import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotificationModule } from './modules/notification/notification.module';

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
  CartComponent,
  FavouritesComponent,
} from './shared/components';

import {
  ErrorInterceptor,
} from 'src/app/core/interceptors';

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
    CartComponent,
    FavouritesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    NotificationModule,
  ],
  providers: [
    ErrorInterceptor.provider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
