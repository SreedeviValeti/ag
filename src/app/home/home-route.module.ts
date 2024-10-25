import { AdministrationRoutingModule } from './administration/administration-routing.module';
import { ROLES } from './../shared/constants/adminstration-constants';
import { PageAccessGuard } from './../services/guards/page-access.guard';
import { CalenderComponent } from './calender/calender.component';
import { ServiceTicketsComponent } from './service-tickets/service-tickets.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { HealthCenterComponent } from './health-center/health-center.component';
import { LogsAndAnalyticsComponent } from './logs-analytics/logs-analytics.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { SetupComponent } from './pillar-config/setup/setup.component';

import { HomeComponent } from './home.component';
import { SplashPageComponent } from './splash-page/splash-page.component';
import { AboutPageComponent } from './about-page/about-page.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,

    children: [ 
      // { path: 'dashboard', component: DashboardComponent },
      { path: 'dashboard', component: SplashPageComponent },
      { path: 'inframetrics', loadChildren: () => import('./inframetrics/inframetrics.module').then(m => m.InframetricsModule) },
      { path: 'administration', loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule) },
      { path: 'calender', component: CalenderComponent },
      { path: 'health-center', component: HealthCenterComponent },
      { path: 'analytics', component: LogsAndAnalyticsComponent },
      { path: 'migration', loadChildren: () => import('./migration/migration.module').then(m => m.MigrationModule) },
      { path: 'environmentdiscovery', loadChildren: () => import('./environmentdiscovery/environmentdiscovery.module').then(m => m.EnvironmentdiscoveryModule) },
      { path: 'securityhub', loadChildren: () => import('./security-hub/security-hub.module').then(m => m.SecurityHubModule) },
      { path: 'servicenow', loadChildren: () => import('./service-tickets/service-tickets.module').then(m => m.ServiceTicketsModule) },
      { path: 'assessment', loadChildren: () => import('./assessment/assessment.module').then(m => m.AssessmentModule) },
      {
        path: 'pillarConfig', loadChildren: () => import('./pillar-config/pillar-config.module').then(m => m.PillarConfigModule),
        canActivate: [PageAccessGuard], data: { accessRoles: [ROLES.ADMIN_GROUP, ROLES.ERPA_ADMIN_GROUP] }
      },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: 'about', component: AboutPageComponent },
      { path: 'inviteusers', loadChildren: () => import('./invite-users/invite-users.module').then(m => m.InviteUsersModule) },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }

];

export const HomeRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
