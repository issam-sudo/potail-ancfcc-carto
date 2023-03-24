import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './ancfcc_home/home/home.component';
import { AboutComponent } from './ancfcc_landing/about/about.component';
import { MarketplaceCartoComponent } from './ancfcc_marketplace/marketplace-carto/marketplace-carto.component';
import { MapEarthComponent } from './ancfcc_marketplace/map-earth/map-earth.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    MarketplaceCartoComponent,
    MapEarthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
