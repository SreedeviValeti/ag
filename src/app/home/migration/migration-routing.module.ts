import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AmiInfoComponent } from './ami-info/ami-info.component';
import { ApplicationBuildComponent } from './application-build/application-build.component';
import { DownloadOraclePatchComponent } from './download-oracle-patch/download-oracle-patch.component';
import { EnvironmentCloneComponent } from './environment-clone/environment-clone.component';
import { InstallAppHomeComponent } from './install-app-home/install-app-home.component';
import { InstallPsHomeComponent } from './install-ps-home/install-ps-home.component';
import { MigrationComponent } from './migration.component';
import { PeoplesoftInventoryComponent } from './peoplesoft-inventory/peoplesoft-inventory.component';
import { StatusBoardComponent } from './status-board/status-board.component';
import { ApplyOsPatchingComponent } from './apply-os-patching/apply-os-patching.component';

const routes: Routes = [{
  path:'',
  component: MigrationComponent,
  children:[
    {
      path:'create-PS-AMI',
      component: AmiInfoComponent
    },
    {
      path:'Download-Oracle-Patch',
      component: DownloadOraclePatchComponent
    },
    {
      path:'install-app-home',
      component: InstallAppHomeComponent
    },
    {
      path:'install-ps-home',
      component: InstallPsHomeComponent
    },
     {
      path:'application-build',
      component: ApplicationBuildComponent
    },
    {
      path:'environment-clone',
      component: EnvironmentCloneComponent
    },
    {
      path:'peoplesoft-inventory',
      component: PeoplesoftInventoryComponent
    },
    {
      path:'status-board',
      component: StatusBoardComponent
    },
    {
      path:'apply-os-patching',
      component: ApplyOsPatchingComponent
    },
    {
      path:'**',
      redirectTo:'application-build',
      pathMatch:'full'
    }
  ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class MigrationRoutingModule { }
