import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MigrationComponent} from './migration.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MigrationRoutingModule } from './migration-routing.module';
import { AmiInfoComponent } from './ami-info/ami-info.component';
import { DownloadOraclePatchComponent } from './download-oracle-patch/download-oracle-patch.component';
import { InstallAppHomeComponent } from './install-app-home/install-app-home.component';
import { InstallPsHomeComponent } from './install-ps-home/install-ps-home.component';
import { EnvironmentCloneComponent } from './environment-clone/environment-clone.component';
import { ApplicationBuildComponent } from './application-build/application-build.component';
import { PeoplesoftInventoryComponent } from './peoplesoft-inventory/peoplesoft-inventory.component';
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
import { StatusBoardComponent } from './status-board/status-board.component';
import { ApplyOsPatchingComponent } from './apply-os-patching/apply-os-patching.component';

@NgModule({
    imports: [
        CommonModule,
        CommonModule,
        SharedModule,
        FormsModule,      
        MigrationRoutingModule  ,
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
        MigrationComponent,
        AmiInfoComponent,
        DownloadOraclePatchComponent,
        InstallAppHomeComponent,
        InstallPsHomeComponent,
        ApplicationBuildComponent,
        EnvironmentCloneComponent,
        PeoplesoftInventoryComponent,
        StatusBoardComponent,
        ApplyOsPatchingComponent

    ],
})
export class MigrationModule {}