import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderDefaultComponent } from './headers/header-default/header-default.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderHomeComponent } from './headers/header-home/header-home.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { SidemenuComponent } from './user/sidemenu/sidemenu.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderDefaultComponent,
    FooterComponent,
    HeaderHomeComponent,
    HomeComponent,
    LoginComponent,
    SidemenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
