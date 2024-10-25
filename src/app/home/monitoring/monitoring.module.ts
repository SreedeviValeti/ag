import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitoringRoutingModule } from './monitoring-routing.module';
import { MonitoringComponent } from './monitoring.component';
import { MonitoringListComponent } from './monitoring-list/monitoring-list.component';


@NgModule({
  declarations: [MonitoringComponent, MonitoringListComponent],
  imports: [
    CommonModule,
    MonitoringRoutingModule
  ]
})
export class MonitoringModule { }
