import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { LogoutComponent } from './authentication/logout/logout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DeleteBookingsComponent } from './dashboard/delete-bookings/delete-bookings.component';
import { DeleteBusComponent } from './dashboard/delete-bus/delete-bus.component';
import { DeleteFeedbackComponent } from './dashboard/delete-feedback/delete-feedback.component';
import { EditBookingsComponent } from './dashboard/edit-bookings/edit-bookings.component';
import { EditBusesComponent } from './dashboard/edit-buses/edit-buses.component';
import { EditPassengerComponent } from './dashboard/edit-passenger/edit-passenger.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'dashboard/edit/:id', component: EditBookingsComponent },
  { path: 'dashboard/editbus/:id', component: EditBusesComponent },
  { path: 'dashboard/deletebus/:id', component: DeleteBusComponent },
  { path: 'dashboard/editfeedback/:id', component: EditPassengerComponent },
  { path: 'dashboard/deletefeedback/:id', component: DeleteFeedbackComponent },
  { path: 'dashboard/delete/:id/:seatnum/:busnum', component: DeleteBookingsComponent },
  

  
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'authentication', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
