import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetricsAppComponent } from './metrics-app/metrics-app.component';
import { InframetricsComponent } from './inframetrics.component';


const routes: Routes = [
  {
    path: '',
    component: InframetricsComponent,
    children: [
      {
        path: '',
        component: MetricsAppComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InframetricsRoutingModule { }
