import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityHubDetailsComponent } from './security-hub-details/security-hub-details.component';

const routes: Routes = [{
  path:'',
  component: SecurityHubDetailsComponent,
  children: [
    {
      path: '',
      component: SecurityHubDetailsComponent
    },
  ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class SecurityRoutingModule { }
