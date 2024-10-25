import {Component} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RefreshService } from 'src/app/services/refresh.service';
import { environment } from 'src/environments/environment.prod';

@Component({
    selector: 'password-management',
    templateUrl: './password-management.component.html',
    styleUrls: ['./password-management.component.scss']
})

export class PasswordManagementComponent {
    loading = false
    migrationBaseUrl = localStorage.getItem('migrationbaseurl');
    pwdurl = `${this.migrationBaseUrl}peoplesoft/get-passwords`
    response
    objectKeys = Object.keys;
    dataSource
    datakeys
    displayedColumns: string[] 
    columnsToDisplay: string[] 

    constructor(private toastr: ToastrService,private refreshService: RefreshService)
    {}
 
    ngOnInit(){
      this.pwdManagement()
    }

    convertPassword(passwords) {
      let password = passwords.toString();
      let encryPass = '*';
      for(let i=0; i< password.length -1 ;i++){
          encryPass =  encryPass + '*';
      }
      return encryPass;
    }

    pwdManagement(){
      
      this.loading = true
      const payload = {
        "environment_type":  localStorage.getItem("envty"), 
        "envname": localStorage.getItem("envname"),
        "account":environment.account,
        "region":environment.region}
      this.refreshService.installPSHome(this.pwdurl,payload,).subscribe(res => {
        this.response = res
        this.loading = false
        this.dataSource = res['Secrets']
        this.datakeys = (Object.keys(this.dataSource[0]));
        console.log(this.datakeys)
        this.displayedColumns = this.datakeys
        this.columnsToDisplay= this.displayedColumns.slice();
        console.log(res)
      })
    } 
}