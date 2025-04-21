import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderDefaultComponent } from './headers/header-default/header-default.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderHomeComponent } from './headers/header-home/header-home.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { SidemenuComponent } from './user/sidemenu/sidemenu.component';
import { ShopComponent } from './marketplace/components/shop/shop.component';
import { GameDetailComponent } from './marketplace/components/game-detail/game-detail.component';
import { BootstrapCarouselComponent } from './marketplace/components/bootstrap-carousel/bootstrap-carousel.component';
import { CheckoutComponent } from './marketplace/components/checkout/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderDefaultComponent,
    FooterComponent,
    HeaderHomeComponent,
    HomeComponent,
    LoginComponent,
    SidemenuComponent,
    ShopComponent,
    GameDetailComponent,
    BootstrapCarouselComponent,
    CheckoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
