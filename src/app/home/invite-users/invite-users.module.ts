import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InviteUsersComponent} from './invite-users.component';
import { ErpaUsersComponent } from './erpa-users/erpa-users.component';
import { InviteUsersRoutingModule } from './invite-users-routing.module';
import { InvUsersComponent } from './inv-users/inv-users.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { InviteViewComponent } from './invite-view/invite-view.component';

@NgModule({
    declarations: [
        InviteViewComponent,
        InviteUsersComponent,
        ErpaUsersComponent,
        InvUsersComponent,
        
    ],
    imports: [
        CommonModule,
        InviteUsersRoutingModule,
        CommonModule,
        SharedModule,
        FormsModule,   
    ],
})
export class InviteUsersModule {}
