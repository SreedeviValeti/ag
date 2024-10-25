import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SecurityHubComponent} from './security-hub.component';
import { SecurityRoutingModule } from './security-hub-routing.module';
import { SecurityHubDetailsComponent } from './security-hub-details/security-hub-details.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        SecurityRoutingModule,
        SharedModule,
    ],
    declarations: [
        SecurityHubComponent,
        SecurityHubDetailsComponent
    ],
    exports: [
        SecurityHubComponent
    ]
})
export class SecurityHubModule {}
