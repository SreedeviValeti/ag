import {Component} from '@angular/core';
import { RefreshService } from 'src/app/services/refresh.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { amivalues, cobollicenvalues } from '../../../shared/constants/adminstration-constants';
import { environment } from '../../../../environments/environment.prod';

@Component({
    selector: 'apply-os-patching',
    templateUrl: './apply-os-patching.component.html',
    styleUrls: ['./apply-os-patching.component.scss']
})
export class ApplyOsPatchingComponent {
    loading = false;
    applyos : FormGroup
    getaamivalues
    amivalues
    respnse:any
    amivaluestype = amivalues
    migrationBaseUrl = localStorage.getItem('migrationbaseurl');;
    applyosurl = `${this.migrationBaseUrl}peoplesoft/apply-os-patches`;
    constructor(private refreshService: RefreshService, private toastr: ToastrService, private formBuilder: FormBuilder)
    {}

    ngOnInit(){
        console.log(amivalues)
      this.applyos = this.formBuilder.group({
        os_type: ['', [Validators.required]],
        amiid: ['', [Validators.required]],
        account: ['', [Validators.required]],
        region:['', [Validators.required]],
      });
    }

    applyOSPatching(){

      this.applyos.patchValue({
        "account":environment.account
      })
      this.applyos.patchValue({
        "region":environment.region
      })
      console.log(this.applyos.value)
      this.loading = true
      this.refreshService.createPSAMI(this.applyosurl,this.applyos.value,).subscribe(res => {
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
    amiType($event) {
      this.getaamivalues = (event.target as HTMLInputElement).value
      console.log(this.getaamivalues)

      if(this.getaamivalues == 'windows'){
       this.applyos.value.amiid = '' 

      }
      else{

        const amiurl = `${this.migrationBaseUrl}peoplesoft/psoft-ami-selector`;
        const payload = {
          "os_type": this.getaamivalues, 
          "account":environment.account,
          "region":environment.region
      }
        this.refreshService.amiInfo(amiurl,payload).subscribe(res => {
        var jsonconvert = JSON.stringify(res['body']);
        this.amivalues = JSON.parse(jsonconvert)
        console.log(this.amivalues)
      })

      }
    }
}
