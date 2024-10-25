import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RefreshService } from 'src/app/services/refresh.service';
import {environment  } from "../../../environments/environment.prod";

@Component({
  selector: 'app-service-tickets',
  templateUrl: './service-tickets.component.html',
  styleUrls: ['./service-tickets.component.scss']
})

export class ServiceTicketsComponent implements OnInit {
  loading = false;
  showCreatePage=false;
  serviceNowData
  migrationBaseUrl = localStorage.getItem('migrationbaseurl');;
  serviceNowUrl = `${this.migrationBaseUrl}peoplesoft/snow-integration`
  constructor(private refreshService: RefreshService,private toastr: ToastrService) 
    { }

  ngOnInit(): void { 
    this.serviceNow()
    //this.serviceNowData = this.jsonData
  }
  
  serviceNow(){
    const payload = {
      "account": environment.account,
      "region":environment.region
    }
    this.loading = true;
    this.refreshService.serviceNow(this.serviceNowUrl,payload).subscribe(res => {
      this.serviceNowData = res
      this.loading = false
      if(res['errorMessage']){
        this.toastr.error(res['errorMessage'])
      }
    }
    )
  }
}
