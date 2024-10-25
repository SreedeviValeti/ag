import {Component} from '@angular/core';
import { RefreshService } from 'src/app/services/refresh.service';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { envtype, extension } from '../../../shared/constants/adminstration-constants';
import {  environment} from "../../../../environments/environment.prod";

@Component({
    selector: 'environment-clone',
    templateUrl: './environment-clone.component.html',
    styleUrls: ['./environment-clone.component.scss']
})
export class EnvironmentCloneComponent {
    
    loading = false;
    envCloneForm : FormGroup
    env = envtype
    respnse:any 
    migrationBaseUrl = localStorage.getItem('migrationbaseurl');;
    envCloneURL = `${this.migrationBaseUrl}scalr/workspace-clone`;

    constructor(private refreshService: RefreshService, private toastr: ToastrService, private formBuilder: FormBuilder)
    {}

    ngOnInit(){
      this.envCloneForm = this.formBuilder.group({
          workspace_name:['', [Validators.required]],
          clone_from_workspace_name: ['', [Validators.required]],
          environment_name: ['', [Validators.required]],
          clone_from_environment_name: ['', [Validators.required]],
          run: ['', [Validators.required]],
          account: ['', [Validators.required]],
          invokeby:['',[Validators.required]],
          region:['', [Validators.required]],
    });
  }

  envClone(){
    this.envCloneForm.patchValue({
      "invokeby":"Active Genie"
    })
    this.envCloneForm.patchValue({
      "run":"false"
    })
    this.envCloneForm.patchValue({
      "account":environment.account
    })
    this.envCloneForm.patchValue({
      "region":environment.region
    })
    console.log(this.envCloneForm.value)
    this.loading = true
    this.refreshService.envClones(this.envCloneURL,this.envCloneForm.value,).subscribe(res => {
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

