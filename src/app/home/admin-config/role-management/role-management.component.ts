import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss']
})
export class RoleManagementComponent implements OnInit {

  isEditing =  false;
  showDDL = false;
  showDDL1 = false;
  
  showActionPopUP = false;
  showCreatePage  = false;

  constructor() { }

  ngOnInit() {
  }

}
