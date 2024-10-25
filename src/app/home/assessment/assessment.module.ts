import { SharedModule } from './../../shared/shared.module';
import { AssessmentRoutingModule } from './assessment-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssessmentComponent } from './assessment.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { ClientConfigComponent } from './client-config/client-config.component';
import { ClientConfigViewComponent } from './client-config/client-config-view/client-config-view.component';
import { ClientConfigCreateComponent } from './client-config/client-config-create/client-config-create.component';
import { ClientConfigEditComponent } from './client-config/client-config-edit/client-config-edit.component';



@NgModule({
  declarations: [AssessmentComponent, ClientDetailsComponent, ClientConfigComponent,
    ClientConfigViewComponent, ClientConfigCreateComponent, ClientConfigEditComponent],
  imports: [
    AssessmentRoutingModule,
    CommonModule,
    SharedModule,
    

  ],
  entryComponents: [ClientConfigCreateComponent,
    ClientConfigEditComponent,
    ClientConfigViewComponent ]
})
export class AssessmentModule { }
