import { AuthGuard } from './../../services/guards/auth.guard';
import { Role } from './../../shared/constants/app.constants';
import { EditAdministrationComponent } from './edit-administration/edit-administration.component';
import { SetupComponent } from './setup/setup.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PillarConfigComponent } from './pillar-config.component';


const routes: Routes = [{
  path: '',
  component: PillarConfigComponent,
  children: [
    {
      path: '',
      component: SetupComponent
    },

    {
      path: ':pillarId/edit/:envId',
      component: EditAdministrationComponent,
      canActivate: [AuthGuard],
      data: { roles: [Role.ERPA_ADMIN_GROUP] }

    }/* ,
    {
      path: '',
      redirectTo: 'CampusSolutions',
      pathMatch: 'full'
    } */
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PillarConfigRoutingModule { }
