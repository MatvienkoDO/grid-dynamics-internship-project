import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { SliderComponent } from './pages/slider/slider.component';
import { CardProductComponent } from './shared/components/card-product/card-product.component';
import { AdvertisementComponent } from './shared/components/advertisement/advertisement.component';
import { SaleComponent } from './shared/components/sale/sale.component';
import { BestSalesComponent } from './pages/best-sales/best-sales.component';
import { CardProductSmallComponent } from './shared/components/card-product-small/card-product-small.component';
import { NewArrivalsComponent } from './pages/new-arrivals/new-arrivals.component';
import { NewsLetterComponent } from './shared/components/news-letter/news-letter.component';
import { ProductComponent } from './service/product.component';

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
    ProductComponent,
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
