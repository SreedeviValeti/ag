import {Component} from '@angular/core';
import { RefreshService } from 'src/app/services/refresh.service';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { OSs,envtype,installOption,extension,cobollicenvalues, unicode } from '../../../shared/constants/adminstration-constants';
import { environment } from '../../../../environments/environment.prod';

@Component({
    selector: 'ami-info',
    templateUrl: './ami-info.component.html',
    styleUrls: ['./ami-info.component.scss']
})

export class AmiInfoComponent {

    loading = false;
    PSAMI : FormGroup
    environments = envtype;
    os = OSs
    hardenval = extension
    unicodevalues =unicode
    installOptions = installOption;
    respnse:any
    osvalue
    amivalues
    cobolvalues = cobollicenvalues
    migrationBaseUrl = localStorage.getItem('migrationbaseurl');;
    createPSAMI = `${this.migrationBaseUrl}peoplesoft/create-ps-ami`;
    constructor(private refreshService: RefreshService, private toastr: ToastrService, private formBuilder: FormBuilder)
    {}

    ngOnInit(){
      console.log(this.installOptions)
      this.PSAMI = this.formBuilder.group({
        installoption:['', [Validators.required]],
        cobollicpatchnumber:['',[Validators.required]],
        cobolpatchnumber:['',[Validators.required]],
        amiid: ['', [Validators.required]],
        patchnumber: ['', [Validators.required]],
        toolsversion: ['', [Validators.required]],
        HardenAMI: ['false', [Validators.required]],
        unicode: ['no', [Validators.required]],
        platform: ['linux', [Validators.required]],
        invokeby:['',[Validators.required]],
        account: ['', [Validators.required]],
        region:['', [Validators.required]],
        cobollictype:['',[Validators.required]]
      });
    }

    CreatePSAMI(){
      this.PSAMI.patchValue({
        "invokeby":"Active Genie"
      })
      this.PSAMI.patchValue({
        "installoption":"create_psami"
      })
      this.PSAMI.patchValue({
        "account":environment.account
      })
      this.PSAMI.patchValue({
        "region":environment.region
      })
      console.log(this.PSAMI.value)
      this.loading = true
      this.refreshService.createPSAMI(this.createPSAMI,this.PSAMI.value,).subscribe(res => {
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
      var jsonconvert = JSON.stringify(res['body']);
      this.amivalues = JSON.parse(jsonconvert)
      console.log(this.amivalues[0].ImageId)
    })
    }
}