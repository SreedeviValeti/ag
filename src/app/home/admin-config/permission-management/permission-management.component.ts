import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-permission-management',
  templateUrl: './permission-management.component.html',
  styleUrls: ['./permission-management.component.scss']
})
export class PermissionManagementComponent implements OnInit {

  isEditing =  false;
  showActionPopUP =  false;
  showCreatePage  = false;

  constructor() { }

  ngOnInit() {
  }

}
