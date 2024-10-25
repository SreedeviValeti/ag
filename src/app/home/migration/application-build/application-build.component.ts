import {Component} from '@angular/core';
import { RefreshService } from 'src/app/services/refresh.service';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { OSs,envtype,installOption,SaaSValue,applicationValue,extension } from '../../../shared/constants/adminstration-constants';
import {  environment} from "../../../../environments/environment.prod";

@Component({
    selector: 'application-build',
    templateUrl: './application-build.component.html',
    styleUrls: ['./application-build.component.scss']
})
export class ApplicationBuildComponent {
    
    loading = false;
    appBuildForm : FormGroup
    environments = envtype;
    os = OSs
    installOptions = installOption;
    saasval = SaaSValue
    applicationValues = applicationValue 
    exts = extension
    currentUser: any;
    emial:any
    respnse:any

    constructor(private refreshService: RefreshService, private toastr: ToastrService, private formBuilder: FormBuilder)
    {}

    migrationBaseUrl = localStorage.getItem('migrationbaseurl');
    appBuildURL = `${this.migrationBaseUrl}scalr/application-setup`;
    ngOnInit(){

      console.log(this.installOptions)
      this.appBuildForm = this.formBuilder.group({
        client:['', [Validators.required]],
        orgid: ['', [Validators.required]],
        project_code: ['', [Validators.required]],
        envtype:['nprd', [Validators.required]],
        requester_email: ['', [Validators.required]],
        account:['',[Validators.required]],
        application: ['peoplesoft', [Validators.required]],
        invokeby:['',[Validators.required]],
        region:['', [Validators.required]],
      });
      this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
      this.emial = this.currentUser["userdetails"]["email"];
      console.log(this.currentUser)
    }

    appBuild(){
      this.appBuildForm.patchValue({
        "invokeby":"Active Genie"
      })
      this.appBuildForm.patchValue({
        "requester_email":this.emial
      })
      this.appBuildForm.patchValue({
        "account":environment.account
      })
      this.appBuildForm.patchValue({
        "region":environment.region
      })
      console.log(this.appBuildForm.value)
      this.loading = true
      this.refreshService.appBuild(this.appBuildURL,this.appBuildForm.value,).subscribe(res => {
        this.respnse = res
        console.log(this.respnse['errorMessage'])
        this.loading = false
        if(this.respnse['statusCode'] === 200){
          this.toastr.success('',this.respnse['body'])
        }
        else{
          this.toastr.error(this.respnse['errorMessage']);
        }
      }, err => {
        this.loading = true
        this.toastr.error(this.respnse['errorMessage']);
      })
    }  
}

