import { DataSource } from '@angular/cdk/collections';
import {Component, ViewChild} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { RefreshService } from 'src/app/services/refresh.service';
import { environment } from 'src/environments/environment.prod';
import 'rxjs/add/observable/of';

@Component({
    selector: 'splash-page',
    templateUrl: './splash-page.component.html',
    styleUrls: ['./splash-page.component.scss']
})

export class SplashPageComponent {
    loading = false;
    respnse:any
    dataSource
    datakeys
    displayedColumns: string[] 
    columnsToDisplay: string[] 
    migrationBaseUrl = localStorage.getItem('migrationbaseurl');
    splahurl = `${this.migrationBaseUrl}peoplesoft/splash-page`
    
    constructor(private refreshService: RefreshService, private toastr: ToastrService){
    }

    ngOnInit(){
      this.getSplashPageDetails()  
    }

    getSplashPageDetails(){
      this.loading = true
      const payload = {
        "source":"aws.apigateway",
        "path":"splash-page",
        "account":environment.account,
        "region":environment.region
      }
      const options= {
        

      }
      
      this.refreshService.pwdManager(this.splahurl,payload).subscribe(res => {
        console.log(res)
        this.dataSource = res
        this.datakeys = (Object.keys(this.dataSource[0]));
        console.log(this.datakeys)
        this.displayedColumns = this.datakeys
        this.columnsToDisplay= this.displayedColumns.slice();
        this.loading = false
        if(res['errorMessage']){
          this.toastr.error(res['errorMessage'])
        }
      })
    }   
}
