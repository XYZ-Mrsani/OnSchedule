import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { LogoutComponent } from './authentication/logout/logout.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path:'dashboard',component:DashboardComponent},
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'logout',component:LogoutComponent},
  
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'authentication', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
