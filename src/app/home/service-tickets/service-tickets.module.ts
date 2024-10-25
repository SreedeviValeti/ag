import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeriveTicketsRoutingModule } from './service-tickets-route.module';

import { ServiceTicketsComponent } from '../service-tickets/service-tickets.component';
import { ServiceTicketListComponent } from './service-ticket-list/service-ticket-list.component';
import { SharedModule } from './../../shared/shared.module';


import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    ServiceTicketsComponent,
    ServiceTicketListComponent
  ],
  imports: [
    CommonModule,
    SeriveTicketsRoutingModule,
    NgbModule,
    SharedModule
  ]
})
export class ServiceTicketsModule { }
