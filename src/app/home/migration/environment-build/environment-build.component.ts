import {Component} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RefreshService } from 'src/app/services/refresh.service';
import { environment } from 'src/environments/environment.prod';

@Component({
    selector: 'environment-build',
    templateUrl: './environment-build.component.html',
    styleUrls: ['./environment-build.component.scss']
})

export class EnvironmentBuildComponent {
    loading = false
    migrationBaseUrl = localStorage.getItem('migrationbaseurl');;
    envbuildurl = `${this.migrationBaseUrl}peoplesoft/env-build-configure`
    response
    
    constructor(private toastr: ToastrService,private refreshService: RefreshService){
      }
 
    ngOnInit(){
        this.getEnvBuild()
    }

    getEnvBuild(){
        this.loading = true
        const payload = {
          "envname": localStorage.getItem("envname"),
          "account":environment.account,
          "region":environment.region
        }
        this.refreshService.pwdManager(this.envbuildurl,payload).subscribe(res => {
          this.response = res
          window.open(this.response.url, '_blank');
          this.loading = false
          console.log(res)
        })
    }   
}
