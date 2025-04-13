import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderDefaultComponent } from './headers/header-default/header-default.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderHomeComponent } from './headers/header-home/header-home.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { ReactiveFormsModule } from '@angular/forms';
import {  HttpClientModule } from '@angular/common/http';
import { LostpasswordComponent } from './lostpassword/lostpassword.component';
import { FormsModule } from '@angular/forms';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RegisterComponent } from './register/register.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AuthGuard } from './services/auth-gard/auth-gard.service';
import { AuthenticationService } from './services/login/authentification.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderDefaultComponent,
    FooterComponent,
    HeaderHomeComponent,
    HomeComponent,
    LoginComponent,
    SidemenuComponent,
    LostpasswordComponent,
    
    ResetPasswordComponent,
          RegisterComponent,
          UserDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule ,
    ReactiveFormsModule , 
    HttpClientModule , 
    RecaptchaModule , 
    FormsModule
 
  ],
  providers: [AuthGuard , AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
