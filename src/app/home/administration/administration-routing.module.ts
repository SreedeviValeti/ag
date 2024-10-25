import { Role } from './../../shared/constants/app.constants';
import { AuthGuard } from './../../services/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdministrationDetailComponent } from './administration-detail/administration-detail.component';
import { AdministrationListComponent } from './administration-list/administration-list.component';
import { AdministrationComponent } from './administration.component';

const routes: Routes = [
  // { path: 'AMI-Info', component: AmiInfoComponent }, 
  // { path: 'Download-Oracle-Patch', component: DownloadOraclePatchComponent },
  // { path: 'install-app-home', component: InstallAppHomeComponent },
  // { path: 'install-ps-home', component: InstallPsHomeComponent } ,


  {
    path: '',
    component: AdministrationComponent,
    children: [
      {
        path: ':pillarId',
        component: AdministrationListComponent
      },
      {
        path: ':pillarId/:envId',
        component: AdministrationDetailComponent
      }

    ],

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
