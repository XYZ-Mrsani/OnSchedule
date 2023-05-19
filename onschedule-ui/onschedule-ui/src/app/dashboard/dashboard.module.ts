import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { EditBookingsComponent } from './edit-bookings/edit-bookings.component';
import { EditBusesComponent } from './edit-buses/edit-buses.component';
import { EditPassengerComponent } from './edit-passenger/edit-passenger.component';
import { DeleteBusComponent } from './delete-bus/delete-bus.component';
import { DeleteFeedbackComponent } from './delete-feedback/delete-feedback.component';
import { DeleteBookingsComponent } from './delete-bookings/delete-bookings.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent,
    EditBookingsComponent,
    EditBusesComponent,
    EditPassengerComponent,
    DeleteBusComponent,
    DeleteFeedbackComponent,
    DeleteBookingsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    TooltipModule,
    FormsModule,
  ]
})
export class DashboardModule { }
