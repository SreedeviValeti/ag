import {Component} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AssessmentService } from 'src/app/services/assessment.service';
import { InfraService } from 'src/app/services/infra.service';
import { environment } from 'src/environments/environment.prod';

@Component({
    selector: 'erpa-users',
    templateUrl: './erpa-users.component.html',
    styleUrls: ['./erpa-users.component.scss']
})
export class ErpaUsersComponent {
 
    loading = false;
    userData:any
    objectKeys = Object.keys;
    migrationBaseUrl = localStorage.getItem('migrationbaseurl');;
    userslisturl = `${this.migrationBaseUrl}activegenie/list-users`;
    constructor( private infraService: InfraService, private toastr: ToastrService,private service: AssessmentService,private formBuilder: FormBuilder
        ){}

    ngOnInit() {
        this.getUsersList()
    }

    getUsersList() {
        const payload = {
            "account": environment.account,
            "region":environment.region
          }
        this.loading = true;
        this.infraService.getenvdiscoverypillarlist(this.userslisturl,payload).subscribe(
            data => {
              if(data['statuscode']===200){
                this.loading = false;
                this.userData = data
                console.log(data)
                this.toastr.success(data['body'])
              }
              else{
                this.toastr.error('unable to fetch data')
              }
            },
            err => {
                this.loading = false;
            });
    }
    toggleApp(app) {
      app.toggleApp = !app.toggleApp;
      app.edit = false;
    }
    toggleClient(app) {
      app.toggleClient = !app.toggleClient;
      app.edit = false;
    }
}
