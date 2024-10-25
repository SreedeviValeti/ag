import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {

  constructor() { }
  contactDetails = false
  clienttDetails = false
  erpaDetails = false
  support = ["Oracle","Rimini"]

  ngOnInit() {
  }

}
