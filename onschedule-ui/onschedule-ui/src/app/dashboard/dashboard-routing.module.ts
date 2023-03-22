import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { EditBookingsComponent } from './edit-bookings/edit-bookings.component';

const routes: Routes = [
  { path: '', 
  children: [{path:'dashboard', component:DashboardComponent}]},
  {path:'dashboard',
children:[
  {path:'edit/:id', component:EditBookingsComponent}
]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
