import { CalenderComponent } from './calender/calender.component';
//import { ServiceTicketsComponent } from './service-tickets/service-tickets.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { HeaderComponent } from './header/header.component';
import { HomeRoutingModule } from './home-route.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { HealthCenterComponent } from './health-center/health-center.component';
import { LogsAndAnalyticsComponent } from './logs-analytics/logs-analytics.component';
import { DashboardComponent } from './dashboard/dashboard.component';
//import { ServiceTicketListComponent } from './service-tickets/service-ticket-list/service-ticket-list.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { SplashPageComponent } from './splash-page/splash-page.component';
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
import { AboutPageComponent } from './about-page/about-page.component';


FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin
])

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    SideBarComponent,
    ChangePasswordComponent,
    HealthCenterComponent,
    LogsAndAnalyticsComponent,
    DashboardComponent,
    CalenderComponent,
    SplashPageComponent,
    AboutPageComponent,
    //ServiceTicketsComponent,
    //ServiceTicketListComponent, 
    ConfigurationComponent,
  ],
  imports: [
    HomeRoutingModule,
    FullCalendarModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFontAwesomeModule,
    CommonModule,
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
  providers: []
})
export class HomeModule {

}
