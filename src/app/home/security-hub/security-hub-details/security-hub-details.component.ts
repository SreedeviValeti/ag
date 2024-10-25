import {Component} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RefreshService } from 'src/app/services/refresh.service';
import { environment } from 'src/environments/environment.prod';

@Component({
    selector: 'security-hub-details',
    templateUrl: './security-hub-details.component.html',
    styleUrls: ['./security-hub-details.component.scss']
})
export class SecurityHubDetailsComponent {
    migrationBaseUrl = localStorage.getItem('migrationbaseurl');;
    securityhuburl = `${this.migrationBaseUrl}activegenie/security-hub-findings`
    securityValues 
    objectKeys = Object.keys;
    loading = false;
    
    ngOnInit(){ 
      this.securityhub();       
      }
    constructor(private refreshService: RefreshService,
      private toastr: ToastrService) {
    } 
    securityhub(){
      const payload = {
        "account": environment.account,
        "region":environment.region
      }
      this.loading = true;
      this.refreshService.serviceNow(this.securityhuburl,payload).subscribe(res => {
        this.securityValues =res 
        console.log(this.securityValues)
        this.loading = false
        if(res['errorMessage']){
          this.toastr.error(res['errorMessage'])
        }
        })
    }
}
