import { EnvDeleteComponentModelType } from './edit-administration/environment-edit/env-delete-type-model/env-delete-type-model.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EnvModelComponent } from './setup/env-model/env-model.component';
import { RollingBounceComponent } from './edit-administration/rolling-bounce/rolling-bounce.component';
import { StepModelComponent } from './edit-administration/steps-edit/step-model/step-model.component';

import { SharedModule } from './../../shared/shared.module';
import { ScriptModelComponent } from './edit-administration/environment-edit/script-model/script-model.component';
import { SetupComponent } from './setup/setup.component';
import { EnvironmentEditComponent } from './edit-administration/environment-edit/environment-edit.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PillarConfigRoutingModule } from './pillar-config-routing.module';
import { PillarConfigComponent } from './pillar-config.component';
import { PillarModelComponent } from './setup/pillar-model/pillar-model.component';
import { EditAdministrationComponent } from './edit-administration/edit-administration.component';
import { StepsEditComponent } from './edit-administration/steps-edit/steps-edit.component';
import { EditEnvModelComponent } from './setup/edit-env-model/edit-env-model.component';


@NgModule({
  declarations: [
    PillarConfigComponent,
    EnvironmentEditComponent,
    StepsEditComponent,
    EditAdministrationComponent,
    StepModelComponent,
    RollingBounceComponent,
    SetupComponent,
    ScriptModelComponent,
    PillarModelComponent,
    EditEnvModelComponent,
    EnvDeleteComponentModelType,

    EnvModelComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    PillarConfigRoutingModule
  ],
  entryComponents: [StepModelComponent,
    EditEnvModelComponent, EnvModelComponent,
    EnvDeleteComponentModelType, PillarModelComponent, ScriptModelComponent]
})
export class PillarConfigModule { }
