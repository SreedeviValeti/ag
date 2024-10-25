import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AmiInfoComponent } from '../migration/ami-info/ami-info.component';
import { EnvdiscoverysetupComponent } from './envdiscoverysetup/envdiscoverysetup/envdiscoverysetup.component';
import { EnvironmentdiscoveryComponent } from './environmentdiscovery.component';
import { EnvviewComponent } from './envview/envview.component';

const routes: Routes = [{
  path:'',
  component: EnvironmentdiscoveryComponent,
  children: [
    {
      path: '',
      component: EnvdiscoverysetupComponent
    },

    {
      path: ':env/view',
      component: EnvviewComponent,

    }
  ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class EnvironemntRoutingModule { }
