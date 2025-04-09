import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { ShopComponent } from './marketplace/components/shop/shop.component';
import { GameDetailComponent } from './marketplace/components/game-detail/game-detail.component';

const routes: Routes = [
  {path:'' , component:HomeComponent},
  {path : '' , redirectTo : 'HomeComponent' , pathMatch : 'full'},
  {path: 'login', component:LoginComponent},
  {path: 'shop', component:ShopComponent},
  {path: 'game-detail/:idArticle/:idGame', component:GameDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
