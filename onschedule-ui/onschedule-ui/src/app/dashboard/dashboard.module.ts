import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { EditBookingsComponent } from './edit-bookings/edit-bookings.component';
import { EditBusesComponent } from './edit-buses/edit-buses.component';
import { EditPassengerComponent } from './edit-passenger/edit-passenger.component';
import { DeleteBusComponent } from './delete-bus/delete-bus.component';


@NgModule({
  declarations: [
    DashboardComponent,
    EditBookingsComponent,
    EditBusesComponent,
    EditPassengerComponent,
    DeleteBusComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
