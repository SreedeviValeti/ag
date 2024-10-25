
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ServiceTicketsComponent } from './service-tickets.component';
import { ServiceTicketListComponent } from './service-ticket-list/service-ticket-list.component';

const routes: Routes = [
  {
    path: '',
    component: ServiceTicketsComponent,
    children: [
      {
        path: 'service-tickets',
        component:ServiceTicketListComponent
      },
      {
        path: '',
        redirectTo: 'service-tickets',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeriveTicketsRoutingModule { }
