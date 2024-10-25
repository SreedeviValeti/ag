import { MaterialModule } from './../../shared/material/material.module';
import { ScheduleEditModelComponent } from './administration-detail/sechedule-edit-model/sechedule-edit-model.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationComponent } from './administration.component';
import { AdministrationListComponent } from './administration-list/administration-list.component';
import { AdministrationDetailComponent } from './administration-detail/administration-detail.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EnvironmentDetailComponent } from './administration-detail/environment-detail/environment-detail.component';
import { LoadcacheComponent } from './administration-detail/loadcache/loadcache.component';     
import { RefreshComponent } from './administration-detail/refresh/refresh.component';
import { DatabbaseComponent } from './administration-detail/database/database.component';
@NgModule({
  declarations: [AdministrationComponent, AdministrationListComponent,
    AdministrationDetailComponent,
    EnvironmentDetailComponent,
    LoadcacheComponent,
    RefreshComponent,
    DatabbaseComponent,
    ScheduleEditModelComponent,
  ],
  imports: [
  CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    AdministrationRoutingModule,
    NgbModule,
    MaterialModule
  ],
  entryComponents: [ScheduleEditModelComponent]
})
export class AdministrationModule { }
