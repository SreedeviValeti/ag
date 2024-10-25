import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InviteUsersComponent } from './invite-users.component';
import { InviteViewComponent } from './invite-view/invite-view.component';
import { ErpaUsersComponent } from './erpa-users/erpa-users.component';

const routes: Routes = [{
  path:'',
  component: InviteUsersComponent,
  children: [

    {
      path: '',
    component: InviteViewComponent,

    }
  ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class InviteUsersRoutingModule { }
