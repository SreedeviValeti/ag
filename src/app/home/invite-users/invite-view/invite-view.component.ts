import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'

@Component({
    selector: 'invite-view',
    templateUrl: './invite-view.component.html',
    styleUrls: ['./invite-view.component.scss']
})
export class InviteViewComponent implements OnInit {

    envname = ''
    tabs = [
        { name: 'invusers', display: 'Invite Users' },
        { name: 'erpausers', display: 'Users List' },
      ];
      selectedTab;
      constructor(
          private location: Location,private actvRoute: ActivatedRoute) {
            this.onTabSelect(this.tabs[0]);
          }
          ngOnInit(): void {
            this.actvRoute.params.subscribe(
              params => {
                this.envname = params['env'];
              });
          }
          
      onTabSelect(tab) {
          this.selectedTab = tab;
        }
  
  
        goToHomeEnvPage() {
          this.location.back()
         }
  }
