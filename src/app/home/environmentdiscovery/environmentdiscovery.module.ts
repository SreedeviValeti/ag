import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EnvironmentdiscoveryComponent} from './environmentdiscovery.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { EnvironemntRoutingModule } from './enviromentdiscovery-routing.module';
import { EnvdiscoverysetupComponent } from './envdiscoverysetup/envdiscoverysetup/envdiscoverysetup.component';
import { EnvviewComponent } from './envview/envview.component';
import { EnvironmentdetailsComponent } from './environmentdetails/environmentdetails.component';
import { UptimePolicyComponent } from './uptime-policy/uptime-policy.component';
import { MaterialModule } from '../../shared/material/material.module';
import {NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PsactivityStatusComponent } from './psactivity-status/psactivity-status.component';
import { EnvmangRefreshStepsComponent } from './envmang-refresh-steps/envmang-refresh-steps.component';
import { EnvmangLoadCacheComponent } from './envmang-load-cache/envmang-load-cache.component';
import { AdhocPsAcitivityComponent } from './adhoc-ps-acitivity/adhoc-ps-acitivity.component';
import { PasswordManagementComponent } from './password-management/password-management.component';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
  } from '@angular/material';
  import { CdkTableModule } from '@angular/cdk/table';
import { EnvironmentBuildComponent } from '../migration/environment-build/environment-build.component';
import { LogRetentionComponent } from './log-retention/log-retention.component';
import { ExecuteScriptsComponent } from './execute-scripts/execute-scripts.component';



@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
        FormsModule,
        EnvironemntRoutingModule,
        MaterialModule,
        NgbModule, 
        SharedModule,
    MatNativeDateModule, 
    CdkTableModule,
MatAutocompleteModule,
MatButtonModule,
MatButtonToggleModule,
MatCardModule,
MatCheckboxModule,
MatChipsModule,
MatStepperModule,
MatDatepickerModule,
MatDialogModule,
MatDividerModule,
MatExpansionModule,
MatGridListModule,
MatIconModule,
MatInputModule,
MatListModule,
MatMenuModule,
MatNativeDateModule,
MatPaginatorModule,
MatProgressBarModule,
MatProgressSpinnerModule,
MatRadioModule,
MatRippleModule,
MatSelectModule,
MatSidenavModule,
MatSliderModule,
MatSlideToggleModule,
MatSnackBarModule,
MatSortModule,
MatTableModule,
MatTabsModule,
MatToolbarModule,
MatTooltipModule,
         
    ],
    declarations: [
        EnvironmentdiscoveryComponent,
        EnvdiscoverysetupComponent,
        EnvviewComponent,
        EnvironmentdetailsComponent,
        UptimePolicyComponent,
        PsactivityStatusComponent,
        EnvmangRefreshStepsComponent,
        EnvmangLoadCacheComponent,
        AdhocPsAcitivityComponent,
        PasswordManagementComponent,
        EnvironmentBuildComponent,
        LogRetentionComponent,
        ExecuteScriptsComponent
    ],
    exports: [
        EnvironmentdiscoveryComponent
    ],
    providers: [NgbActiveModal],
    entryComponents: [UptimePolicyComponent]


})
export class EnvironmentdiscoveryModule {}