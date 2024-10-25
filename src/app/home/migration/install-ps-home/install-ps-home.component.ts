import {Component} from '@angular/core';
import { RefreshService } from 'src/app/services/refresh.service';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { OSs,envtype,installOption, unicode } from '../../../shared/constants/adminstration-constants';
import {  environment} from "../../../../environments/environment.prod";

@Component({
    selector: 'install-ps-home',
    templateUrl: './install-ps-home.component.html',
    styleUrls: ['./install-ps-home.component.scss']
})
export class InstallPsHomeComponent {
    loading = false;
    psHome : FormGroup
    environments = envtype;
    os = OSs
    installOptions = installOption;
    respnse:any
    osvalue
    amivalues
    unicodevalues = unicode
    migrationBaseUrl = localStorage.getItem('migrationbaseurl');;
    createPSAMI = `${this.migrationBaseUrl}peoplesoft/install-ps-home`;

    constructor(private refreshService: RefreshService, private toastr: ToastrService, private formBuilder: FormBuilder){

    }
 
    ngOnInit(){
      console.log(this.installOptions)
      this.psHome = this.formBuilder.group({
        installoption: ['', [Validators.required]],
        amiid: ['', [Validators.required]],
        patchnumber: ['', [Validators.required]],
        envtype: ['nprd', [Validators.required]],
        toolsversion: ['', [Validators.required]],
        platform: ['linux', [Validators.required]],
        invokeby:['',[Validators.required]],
        account:['',[Validators.required]],
        region:['', [Validators.required]],
        unicode: ['no', [Validators.required]],

    });
    }

    installPSHome(){
      this.psHome.patchValue({
        "invokeby":"Active Genie"
      })
      this.psHome.patchValue({
        "installoption":"install_ps_home"
      })
      this.psHome.patchValue({
        "account":environment.account
      })
      this.psHome.patchValue({
        "region":environment.region
      })
      console.log(this.psHome.value)
      this.loading = true
      this.refreshService.installPSHome(this.createPSAMI,this.psHome.value,).subscribe(res => {
        this.respnse = res
        console.log(this.respnse['errorMessage'])
        this.loading = false
        if(this.respnse['statusCode'] ===200){
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
