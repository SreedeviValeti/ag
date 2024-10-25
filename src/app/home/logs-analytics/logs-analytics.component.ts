import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from "../../../environments/environment.prod";



@Component({
  selector: 'app-logs-and-analytics',
  templateUrl: './logs-analytics.component.html',
  styleUrls: ['./logs-analytics.component.scss']
})
export class LogsAndAnalyticsComponent implements OnInit {

  appmetrics = environment.appmetrics
  infraurl:any;

  constructor(    private sanitizer: DomSanitizer,
    ) { }
  
  ngOnInit() {
    this.infraurl = this.sanitizer.bypassSecurityTrustResourceUrl(this.appmetrics);

  }
  
}
