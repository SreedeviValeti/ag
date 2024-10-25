import {Component} from '@angular/core';
import { RefreshService } from 'src/app/services/refresh.service';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { OSs } from '../../../shared/constants/adminstration-constants';
import {  environment} from "../../../../environments/environment.prod";

@Component({
  selector: 'download-oracle-patch',
  templateUrl: './download-oracle-patch.component.html',
  styleUrls: ['./download-oracle-patch.component.scss']
})

export class DownloadOraclePatchComponent {

  loading = false;
  oraclePatch : FormGroup
  os = OSs
  kibanaURL;
  URL = 'https://erpa.scalr.io/#/19047/24663/dashboard' 
  migrationBaseUrl = localStorage.getItem('migrationbaseurl');;
  downloadpatch = `${this.migrationBaseUrl}peoplesoft/download-oracle-patch`;

  constructor(private refreshService: RefreshService, private toastr: ToastrService, private formBuilder: FormBuilder)
  {}


  ngOnInit(){
    this.oraclePatch = this.formBuilder.group({
      patchnumber: ['', [Validators.required]],
      platform: ['linux', [Validators.required]],
      account:['',[Validators.required]],
      invokeby:['',[Validators.required]],
      region:['', [Validators.required]],
  });
  // this.kibanaURL = this.URL + "&output=embed";
  // window.location.replace(this.kibanaURL);
  }
  downloadOraclePatch(){
    this.oraclePatch.patchValue({
      "invokeby":"Active Genie"
    })
    this.oraclePatch.patchValue({
      "account":environment.account
    })
    this.oraclePatch.patchValue({
      "region":environment.region
    })
    console.log(this.oraclePatch.value)
    this.loading = true
    this.refreshService.downloadOraclePatches(this.downloadpatch,this.oraclePatch.value,).subscribe(res => {
      var response = res
      this.loading = false
      if(response['statusCode'] === 200){
        this.toastr.success('',response['body'])
      }
      else{
        this.toastr.error(response['errorMessage']);
      }
    }, err => {
      this.loading = true
      this.toastr.error('failed');
    })
  }  
}