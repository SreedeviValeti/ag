import {Component} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal,ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { RefreshService } from 'src/app/services/refresh.service';
import { environment } from 'src/environments/environment.prod';
import { adhocValues } from '../../../shared/constants/adminstration-constants';

@Component({
    selector: 'adhoc-ps-acitivity',
    templateUrl: './adhoc-ps-acitivity.component.html',
    styleUrls: ['./adhoc-ps-acitivity.component.scss']
})
export class AdhocPsAcitivityComponent {
    adohcpsactivityForm: FormGroup
    psvalue
    pstype
    migrationBaseUrl = localStorage.getItem('migrationbaseurl');
    adhocAPI = `${this.migrationBaseUrl}peoplesoft/pia-activities`
    startec2 = `${this.migrationBaseUrl}peoplesoft/autoscaling-start`
    stopec2 = `${this.migrationBaseUrl}peoplesoft/autoscaling-stop`
    rdssnapshots = `${this.migrationBaseUrl}activegenie/rdssnapshots`
    urlhelatchcheck = `${this.migrationBaseUrl}peoplesoft/url-healthcheck`

    loading = false
    adhocpiacomponents = []
    closeResult: string = ''
    adohcpsvalues = adhocValues
    highavailable

    constructor(private formBuilder: FormBuilder,          private toastr: ToastrService,
        public activeModal: NgbActiveModal,private refreshService: RefreshService,private modalService: NgbModal,
          ){}

    adhocservertypeform = new FormGroup({
      app: new FormControl('', Validators.required),
      web: new FormControl('', Validators.required),
      prcs: new FormControl('', Validators.required),
    })

    ngOnInit(){
      this.adohcpsactivityForm = this.formBuilder.group({
        action: ['', [Validators.required]],
        envname: ['',[Validators.required]],
        urlhelathcheck:['',[Validators.required]],
        version:['',[Validators.required]]
        });
        const val = localStorage.getItem("highvavailable");
        this.highavailable = JSON.parse(val);
    }

    psservertypeadhoc(){
      var scheduledate = this.adhocservertypeform.value
      if(this.adhocservertypeform.get('prcs').value == true){
        this.adhocpiacomponents.push("prcs")
      }
      if(this.adhocservertypeform.get('web').value == true){
        this.adhocpiacomponents.push("web")
      }
      if(this.adhocservertypeform.get('app').value == true){
        this.adhocpiacomponents.push("app")
      }
      console.log(this.adhocpiacomponents)
      localStorage.setItem("adhocpiacomponents",JSON.stringify(this.adhocpiacomponents))
      this.adhocpiacomponents.splice(0, this.adhocpiacomponents.length)
      console.log(this.adhocpiacomponents)
      this.activeModal.close(true);
      this.closeResult = `Dismissed ${this.getDismissReason('test')}`;
      console.log(this.adhocpiacomponents)
    }

    openModalsAghoc(content, size) {
      this.modalService.open(content, { size: size });
    }
    
    slectpstype($event){
      this.pstype = (event.target as HTMLInputElement).value
      }

    adhoc($event){
        this.psvalue = (event.target as HTMLInputElement).value
        if(this.pstype == 'start-environment' ){
          const payload = {
            "envname": localStorage.getItem("envname"),
            "action": this.pstype,
            "account":environment.account,
            "region":environment.region
          };
          console.log(payload)
          this.refreshService.databaseInfo(this.startec2,payload,).subscribe(res => {
            console.log(res)
            if(res['statuscode'] === 200){
              this.loading = false
              this.toastr.success(res['body'])
            }
            else if(res['statuscode'] === 403){
              this.toastr.error(res['errorMessage'])
            }
            else{
              this.toastr.error(res['errorMessage'])
            }
          }) 
        }
        
        if(this.pstype == 'stop-environment'){
          const payload = {
            "envname": localStorage.getItem("envname"),
            "action": this.pstype,
            "account":environment.account,
            "region":environment.region
          };
          console.log(payload)
          this.refreshService.databaseInfo(this.stopec2,payload,).subscribe(res => {
            console.log(res)
            if(res['statuscode'] === 200){
              this.loading = false
              this.toastr.success(res['body'])
            }
            else if(res['statuscode'] === 403){
              this.toastr.error(res['errorMessage'])
            }
            else{
              this.toastr.error(res['errorMessage'])
            }
          }) 
        }
  
        else if(this.pstype == 'clearcache'){
          const payload = {
            "envname": localStorage.getItem("envname"),
            "action": this.pstype,
            "pia_components":JSON.parse(localStorage.getItem("adhocpiacomponents")),
            "account":environment.account,
            "region":environment.region
          };
          console.log(payload)
          this.refreshService.databaseInfo(this.adhocAPI,payload,).subscribe(res => {
            console.log(res)
            if(res['statuscode'] === 200){
              this.loading = false
              this.toastr.success(res['body'])
            }
            else if(res['statuscode'] === 403){
              this.toastr.error(res['errorMessage'])
            }
            else{
              this.toastr.error(res['errorMessage'])
            }
          }) 
        }
        else if(this.pstype == 'rolling-bounce'){
          const payload = {
            "envname": localStorage.getItem("envname"),
            "action": this.pstype,
            "pia_components":JSON.parse(localStorage.getItem("adhocpiacomponents")),
            "account":environment.account,
            "region":environment.region
          };
          console.log(payload)
          this.refreshService.databaseInfo(this.adhocAPI,payload,).subscribe(res => {
            console.log(res)
            if(res['statuscode'] === 200){
              this.loading = false
              this.toastr.success(res['body'])
            }
            else if(res['statuscode'] === 403){
              this.toastr.error(res['errorMessage'])
            }
            else{
              this.toastr.error(res['errorMessage'])
            }
          }) 
        }
        else if(this.pstype == 'rolling-bounce-clearcache'){
          const payload = {
            "envname": localStorage.getItem("envname"),
            "action": this.pstype,
            "pia_components":JSON.parse(localStorage.getItem("adhocpiacomponents")),
            "account":environment.account,
            "region":environment.region
          };
          console.log(payload)
          this.refreshService.databaseInfo(this.adhocAPI,payload,).subscribe(res => {
            console.log(res)
            if(res['statuscode'] === 200){
              this.loading = false
              this.toastr.success(res['body'])
            }
            else if(res['statuscode'] === 403){
              this.toastr.error(res['errorMessage'])
            }
            else{
              this.toastr.error(res['errorMessage'])
            }
          }) 
        }
        else if(this.pstype == 'bounce'){
          const payload = {
            "envname": localStorage.getItem("envname"),
            "action": this.pstype,
            "pia_components":JSON.parse(localStorage.getItem("adhocpiacomponents")),
            "account":environment.account,
            "region":environment.region,
          };
          console.log(payload)
          this.refreshService.databaseInfo(this.adhocAPI,payload,).subscribe(res => {
            console.log(res)
            if(res['statuscode'] === 200){
              this.loading = false
              this.toastr.success(res['body'])
            }
            else if(res['statuscode'] === 403){
              this.toastr.error(res['errorMessage'])
            }
            else{
              this.toastr.error(res['errorMessage'])
            }
          }) 
        }
        else if(this.pstype == 'ipcclean'){
          var piabounce = `${this.migrationBaseUrl}peoplesoft/pia-activities`
          const payload = {
            "envname": localStorage.getItem("envname"),
            "action": this.pstype,
            "pia_components":JSON.parse(localStorage.getItem("adhocpiacomponents")),
            "account":environment.account,
            "region":environment.region
          };
          console.log(payload)
          this.refreshService.databaseInfo(this.adhocAPI,payload,).subscribe(res => {
            console.log(res)
            if(res['statuscode'] === 200){
              this.loading = false
              this.toastr.success(res['body'])
            }
            else if(res['statuscode'] === 403){
              this.toastr.error(res['errorMessage'])
            }
            else{
              this.toastr.error(res['errorMessage'])
            }
          }) 
        }
        else if(this.pstype == 'start'){
          var piabounce = `${this.migrationBaseUrl}peoplesoft/pia-activities`
          const payload = {
            "envname": localStorage.getItem("envname"),
            "action": this.pstype,
            "pia_components":JSON.parse(localStorage.getItem("adhocpiacomponents")),
            "account":environment.account,
            "region":environment.region
          };
          console.log(payload)
          this.refreshService.databaseInfo(this.adhocAPI,payload,).subscribe(res => {
            console.log(res)
            if(res['statuscode'] === 200){
              this.loading = false
              this.toastr.success(res['body'])
            }
            else if(res['statuscode'] === 403){
              this.toastr.error(res['errorMessage'])
            }
            else{
              this.toastr.error(res['errorMessage'])
            }
          }) 
        }
        else if(this.pstype == 'stop'){
          var piabounce = `${this.migrationBaseUrl}peoplesoft/pia-activities`
          const payload = {
            "envname": localStorage.getItem("envname"),
            "action": this.pstype,
            "pia_components":JSON.parse(localStorage.getItem("adhocpiacomponents")),
            "account":environment.account,
            "region":environment.region
          };
          console.log(payload)
          this.refreshService.databaseInfo(this.adhocAPI,payload,).subscribe(res => {
            console.log(res)
            if(res['statuscode'] === 200){
              this.loading = false
              this.toastr.success(res['body'])
            }
            else if(res['statuscode'] === 403){
              this.toastr.error(res['errorMessage'])
            }
            else{
              this.toastr.error(res['errorMessage'])
            }
          }) 
        }
        else if(this.pstype == 'url-healthcheck'){
          const payload = {
            "envname": localStorage.getItem("envname"),
            "account":environment.account,
            "region":environment.region
          };
          console.log(payload)
          this.refreshService.databaseInfo(this.urlhelatchcheck,payload,).subscribe(res => {
            console.log(res)
            if(res['statuscode'] === 200){
              this.loading = false
              this.toastr.success(res['body'])
            }
            else if(res['statuscode'] === 403){
              this.toastr.error(res['errorMessage'])
            }
            else{
              this.toastr.error(res['errorMessage'])
            }
          }) 
        }
        else if(this.pstype == 'RDS-Backups'){
          const payload = {
            "DBInstanceIdentifier": localStorage.getItem("envname"),
            "account":environment.account,
            "region":environment.region
          };
          console.log(payload)
          this.refreshService.databaseInfo(this.rdssnapshots,payload,).subscribe(res => { 
            console.log(res)
            if(res['StatusCode'] === 200){
              this.loading = false
              this.toastr.success(res['body'])
            }
          else if(res['StatusCode'] === 403){
            this.toastr.error(res['errorMessage'])
          }
          else{
            this.toastr.error(res['errorMessage'])
          }
          }) 
        } 
      }

    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return  `with: ${reason}`;
      }
  } 

    
}
