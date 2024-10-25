import {Component} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UtilService } from 'src/app/services/util.service';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { InfraService } from 'src/app/services/infra.service';
import { FormGroup,Validators,FormBuilder } from '@angular/forms';
import { scripts } from '../../../shared/constants/adminstration-constants';

@Component({
    selector: 'execute-scripts',
    templateUrl: './execute-scripts.component.html',
    styleUrls: ['./execute-scripts.component.scss']
})

export class ExecuteScriptsComponent

 {

    loading = false;
    migrationBaseUrl = localStorage.getItem('migrationbaseurl');
    refreshurl = `${this.migrationBaseUrl}peoplesoft/refreshsteps`
    uploadform:FormGroup
    scriptsvalues = scripts
    file:any
    reader:any
    showUpload = false;

    constructor(private utilService: UtilService,
        private toastr: ToastrService,
        private http: HttpClient,
        private infraService: InfraService,
        private formBuilder: FormBuilder) 
        {}

    ngOnInit(){
      this.uploadform = this.formBuilder.group({
        scriptstype: ['', [Validators.required]],
      });
    }
  
    onFileChange(event) {
      this.reader = new FileReader();
      if(event.target.files && event.target.files.length > 0) {
        this.file = event.target.files[0];
        console.log(this.file.name)
      }
    }

    requestUpload(){
    this.reader.readAsDataURL(this.file);
    this.reader.onload = () => {
    const fileurl = `https://${environment.fileuploaddomain}/${environment.saas_bucket}/client-scripts/${environment.account}/${environment.region}/${localStorage.getItem("envname")}/${this.uploadform.value.scriptstype}/${this.file.name}`
    console.log(fileurl)
    this.infraService.fileUpload(fileurl,this.file).subscribe(
      data => {
        console.log(data)
        alert('Uploaded Successfully.');
        this.showUpload  = false;

      },
    err => {
       console.log("err data is", err);
       this.loading = false;
     });       
    };
    }

    onClickedOutside($event) {
      this.showUpload  = false;
    }
}