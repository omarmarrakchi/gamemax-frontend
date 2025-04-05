import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LostpasswordComponent } from './lostpassword/lostpassword.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './services/auth-gard/auth-gard.service';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'lostpassword', component: LostpasswordComponent },
  { path: 'resetpassword', component: ResetPasswordComponent },
  {path : 'register' , component:RegisterComponent} , 
  { path: 'user-details', component: UserDetailsComponent, canActivate: [AuthGuard] } ,
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }