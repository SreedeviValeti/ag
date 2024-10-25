import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loading = false;
  
  constructor() { }

  ngOnInit() {
  }
  showLoader($event) {
    this.loading = $event;
  }

}
