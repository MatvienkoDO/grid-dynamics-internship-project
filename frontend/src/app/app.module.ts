import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { SliderComponent } from './pages/slider/slider.component';
import { CardComponent } from './shared/components/card/card.component';
import { AdvertisementComponent } from './shared/components/advertisement/advertisement.component';
import { SaleComponent } from './shared/components/sale/sale.component';
import { NewArrivalsComponent } from './pages/new-arrivals/new-arrivals.component';
import { NewsLetterComponent } from './shared/components/news-letter/news-letter.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SliderComponent,
    CardComponent,
    AdvertisementComponent,
    SaleComponent,
    NewArrivalsComponent,
    NewsLetterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
