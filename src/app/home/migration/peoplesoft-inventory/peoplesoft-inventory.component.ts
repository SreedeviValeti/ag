import { DataSource } from '@angular/cdk/collections';
import {Component, ViewChild} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { RefreshService } from 'src/app/services/refresh.service';
import { environment } from 'src/environments/environment.prod';
import 'rxjs/add/observable/of';


@Component({
    selector: 'peoplesoft-inventory',
    templateUrl: './peoplesoft-inventory.component.html',
    styleUrls: ['./peoplesoft-inventory.component.scss']
})

export class PeoplesoftInventoryComponent  {
    loading = false;
    invresponse:any
    migrationBaseUrl = localStorage.getItem('migrationbaseurl');;
    psinventoryurl = `${this.migrationBaseUrl}peoplesoft/peoplesoft-inventory`;
    objectKeys = Object.keys;
    dataSource
    datakeys
    displayedColumns: string[] 
    columnsToDisplay: string[] 
    Nprddatasource
    ProdAPPHOMES
    NprdAPPHOMES:string[]
    ProdPSHOMES
    awsredHatImagesDataSource
    awsredHatImagesdatakeys
    awsredHatImagesdisplayedColumns: string[] 
    awsredHatImagescolumnsToDisplay: string[] 

    AWSOracleLinuxImagesDataSource
    AWSOracleLinuxImagesdatakeys
    AWSOracleLinuxImagesdisplayedColumns: string[] 
    AWSOracleLinuxImagescolumnsToDisplay: string[] 
    
    constructor(private refreshService: RefreshService, private toastr: ToastrService){
    }
    ngOnInit(){
      this.psInventory()

    }
    psInventory(){
      const payload = {
        "account": environment.account,
        "region":environment.region
      }    
      this.loading = true
      this.refreshService.psInventory(this.psinventoryurl,payload).subscribe(res => {
        this.invresponse = res
        this.loading = false
        
        this.awsredHatImagesDataSource = this.invresponse['AWSRedHatImages'];
        this.awsredHatImagesdatakeys = (Object.keys(this.invresponse['AWSRedHatImages'][0]));
        console.log(this.awsredHatImagesdatakeys)
        this.awsredHatImagesdisplayedColumns = this.awsredHatImagesdatakeys
        this.awsredHatImagescolumnsToDisplay= this.awsredHatImagesdisplayedColumns.slice();

        this.AWSOracleLinuxImagesDataSource = this.invresponse['AWSOracleLinuxImages'];
        this.AWSOracleLinuxImagesdatakeys = (Object.keys(this.invresponse['AWSOracleLinuxImages'][0]));
        console.log(this.AWSOracleLinuxImagesdatakeys)
        this.AWSOracleLinuxImagesdisplayedColumns = this.AWSOracleLinuxImagesdatakeys
        this.AWSOracleLinuxImagescolumnsToDisplay= this.AWSOracleLinuxImagesdisplayedColumns.slice();

        this.Nprddatasource = JSON.parse("[" + this.invresponse['NprdPSHOMES'] + "]");
        this.NprdAPPHOMES  = this.invresponse['NprdAPPHOMES'].split(',');
        this.ProdPSHOMES = this.invresponse['ProdPSHOMES'].split(',');
        this.ProdAPPHOMES = this.invresponse['ProdAPPHOMES'].split(',');

        this.dataSource = this.invresponse['PeoplesoftImages'];
        this.datakeys = (Object.keys(this.invresponse['PeoplesoftImages'][0]));
        console.log(this.datakeys)
        this.displayedColumns = this.datakeys
        this.columnsToDisplay= this.displayedColumns.slice();
        console.log(res)
        if(res['errorMessage']){
          this.toastr.error(res['errorMessage'])
        }
      })
    }
}