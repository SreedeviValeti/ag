import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InframetricsRoutingModule } from './inframetrics-routing.module';
import { InframetricsComponent } from './inframetrics.component';
import { MetricsAppComponent } from './metrics-app/metrics-app.component';
import { SharedModule } from './../../shared/shared.module';


@NgModule({
  declarations: [InframetricsComponent, MetricsAppComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,      
    InframetricsRoutingModule
  ]
})
export class InframetricsModule { }
