import { PermissionManagementComponent } from './permission-management/permission-management.component';
import { RoleManagementComponent } from './role-management/role-management.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminConfigComponent } from './admin-config.component';


const routes: Routes = [{
path:'',
component: AdminConfigComponent,
children:[
  {
    path:'users',
    component: UserManagementComponent
  },
  {
    path:'roles',
    component: RoleManagementComponent
  },
  {
    path:'permissions',
    component: PermissionManagementComponent
  },
  {
    path:'**',
    redirectTo:'users',
    pathMatch:'full'
  }
]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminConfigRoutingModule { }
