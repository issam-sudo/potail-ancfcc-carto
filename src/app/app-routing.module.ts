import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './ancfcc_home/home/home.component';
import { AboutComponent } from './ancfcc_landing/about/about.component';
import { MapEarthComponent } from './ancfcc_marketplace/map-earth/map-earth.component';
import { MarketplaceCartoComponent } from './ancfcc_marketplace/marketplace-carto/marketplace-carto.component';

const routes: Routes = [
{path:'portail/home', component:HomeComponent},
//{path:'about', component:AboutComponent},
{path:'cartographie/marketplace', component:MarketplaceCartoComponent},
{path:'**', component:HomeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
