import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service-ticket-list',
  templateUrl: './service-ticket-list.component.html',
  styleUrls: ['./service-ticket-list.component.scss']
})
export class ServiceTicketListComponent implements OnInit {
  constructor() { }
  isEditing=false;
   showCreatePage=false;

  ngOnInit(): void { }
}
