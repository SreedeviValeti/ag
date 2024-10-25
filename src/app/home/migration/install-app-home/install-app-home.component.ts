import {Component} from '@angular/core';
import { RefreshService } from 'src/app/services/refresh.service';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { OSs,envtype,installOption, unicode } from '../../../shared/constants/adminstration-constants';
import { environment } from "../../../../environments/environment.prod";
import { JsonPipe } from '@angular/common';

@Component({
    selector: 'install-app-home',
    templateUrl: './install-app-home.component.html',
    styleUrls: ['./install-app-home.component.scss']
})

export class InstallAppHomeComponent {

    loading = false;
    installApp : FormGroup
    environments = envtype;
    os = OSs
    installOptions = installOption;
    respnse:any
    amivalues
    osvalue
    unicodevalues = unicode
    migrationBaseUrl = localStorage.getItem('migrationbaseurl');;

    constructor(private refreshService: RefreshService, private toastr: ToastrService, private formBuilder: FormBuilder)
    {}

    ngOnInit(){

      this.installApp = this.formBuilder.group({
      installoption: ['', [Validators.required]],
      amiid: ['', [Validators.required]],
      patchnumber: ['', [Validators.required]],
      envtype: ['nprd', [Validators.required]],
      appversion: ['', [Validators.required]],
      platform: ['linux', [Validators.required]],
      invokeby:['',[Validators.required]],
      account: ['', [Validators.required]],
      region:['', [Validators.required]],
      unicode: ['no', [Validators.required]],

      });
  }

  installAppHome(){
    this.installApp.patchValue({
      "invokeby":"Active Genie"
    })
    this.installApp.patchValue({
      "installoption":"install_app_home"
    })
    this.installApp.patchValue({
      "account":environment.account
    })
    this.installApp.patchValue({
      "region":environment.region
    })
    const installappHome = `${this.migrationBaseUrl}peoplesoft/install-app-home`;
    console.log(this.installApp.value)
    this.loading = true
    this.refreshService.installAppHome(installappHome,this.installApp.value,).subscribe(res => {
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

  osType($event) {

    this.osvalue = (event.target as HTMLInputElement).value
    const amiurl = `${this.migrationBaseUrl}peoplesoft/psoft-ami-selector`;
    const payload = {
      "os_type": this.osvalue, 
      "account":environment.account,
      "region":environment.region
    }
    this.refreshService.amiInfo(amiurl,payload).subscribe(res => {
    this.amivalues = res['body']
    console.log(this.amivalues)

  })
  }
}
