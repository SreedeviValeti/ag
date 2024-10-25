import {Component, Output,EventEmitter, Injectable} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal,ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RefreshService } from 'src/app/services/refresh.service';
import { environment } from 'src/environments/environment.prod';
import { UptimePolicyComponent } from '../uptime-policy/uptime-policy.component';
import { ToastrService } from 'ngx-toastr';
import { shedulepsValues} from '../../../shared/constants/adminstration-constants';

@Component({
    selector: 'psactivity-status',
    templateUrl: './psactivity-status.component.html',
    styleUrls: ['./psactivity-status.component.scss']
})

export class PsactivityStatusComponent {
  schedulepsactivityForm : FormGroup
  adohcpsactivityForm: FormGroup
  psactivitiesform: FormGroup
  schedulepsVAlues = shedulepsValues
  scheduleInfo: any;
  selectedOption:any;
  selectedpsoption:any
  closeResult: string = ''
  pstype = ''
  psvalue
  piacomponents = []
  adhocpiacomponents = []
  items
  loading = false;
  State= ''
  getEventsLength;
  Name = ''
  highavailable :boolean
  psvaluecount;
  versions = ['latest','default']
  migrationBaseUrl = localStorage.getItem('migrationbaseurl');
  startstop = `${this.migrationBaseUrl}peoplesoft/autoscaling-start-stop`
  scheduleevent = `${this.migrationBaseUrl}peoplesoft/get-scheduled-activities`
  scheduleAPI = `${this.migrationBaseUrl}peoplesoft/schedule-activities`
  enabledisable = `${this.migrationBaseUrl}peoplesoft/update-scheduled-activities`
    
    constructor(private formBuilder: FormBuilder,          private toastr: ToastrService,
      public activeModal: NgbActiveModal,private refreshService: RefreshService,private modalService: NgbModal,)
      {}

    datetimeform = new FormGroup({
      desiredcapacity: new FormControl('', Validators.required),
      scheduledate: new FormControl('', Validators.required),
      scheduletime: new FormControl('', Validators.required),
    });

    servertypeform = new FormGroup({
      app: new FormControl('', Validators.required),
      web: new FormControl('', Validators.required),
      prcs: new FormControl('', Validators.required),
    })

    adhocservertypeform = new FormGroup({
      app: new FormControl('', Validators.required),
      web: new FormControl('', Validators.required),
      prcs: new FormControl('', Validators.required),
    })

    ngOnInit(){
      
      this.scheduleevents()
      this.schedulepsactivityForm = this.formBuilder.group({
        action: ['', [Validators.required]],
        envname: ['',[Validators.required]],
        urlhelathcheck:['',[Validators.required]],
        version:['latest',[Validators.required]],
        rate:['',[Validators.required]]
      });

      this.psactivitiesform = this.formBuilder.group({
        Name: ['', [Validators.required]],
        State: ['', [Validators.required]],
        checkboxselect: ['', [Validators.required]]
      });

      this.adohcpsactivityForm = this.formBuilder.group({
        action: ['', [Validators.required]],
        envname: ['',[Validators.required]],
        urlhelathcheck:['',[Validators.required]],
        version:['latest',[Validators.required]]
      });

      this.datetimeform = this.formBuilder.group({
        desiredcapacity:['','[Validators.required]'],
        scheduledate:['','[Validators.required]'],
        scheduletime:['','[Validators.required]']
      });

      this.servertypeform = this.formBuilder.group({
        app:['','[Validators.required]'],
        web:['','[Validators.required]'],
        prcs: ['','[Validators.required]'],
      })
    }

    schedulescales(){
      var desiredcapacity = this.datetimeform.get('desiredcapacity').value
      var scheduledate = this.datetimeform.get('scheduledate').value
      var scheduletime = this.datetimeform.get('scheduletime').value
      const payload = {
        "envname": localStorage.getItem("envname"),
        "action": this.pstype,   
        "capacity":desiredcapacity,      
        "cron_expression": scheduledate + ' '+ scheduletime,
        "account":environment.account,
        "region":environment.region
      };
      console.log(payload)
      this.refreshService.databaseInfo(this.scheduleAPI,payload,).subscribe(res => {
        console.log(res)
        this.scheduleevents();
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

    slectpstype($event){
      this.pstype = (event.target as HTMLInputElement).value
      this.psvaluecount = $event.currentTarget.childElementCount
    }

    scheduleevents(){
      const val = localStorage.getItem("highvavailable");
      this.highavailable = JSON.parse(val);
      this.loading = true;
      const payload ={
        "envname": localStorage.getItem("envname"),
        "account":environment.account,
        "region":environment.region
      }
      this.refreshService.databaseInfo(this.scheduleevent,payload,).subscribe(res => {
        if(res['StatusCode'] === 200){
          this.getEventsLength = Object.keys(res).length
          this.items = res
          this.loading = false
          this.toastr.success('Successfully Fetched Scheduled Events')
        }
        else if(res['statuscode'] === 403){
          this.toastr.error(res['errorMessage'])
        }
        else{
          this.toastr.error(res['errorMessage'])
        }
      console.log(res)
        })
    }
    openModal() {
    if(this.pstype == 'weblogic-usercount'){
      const payload = {
        "envname": localStorage.getItem("envname"),
        "action": this.pstype,
        "account":environment.account,
        "region":environment.region
      };
      console.log(payload)
      this.refreshService.databaseInfo(this.scheduleAPI,payload,).subscribe(res => {
        console.log(res)
        this.scheduleevents();
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
    else  if(this.pstype == 'url-healthcheck'){
      const payload = {
        "envname": localStorage.getItem("envname"),
        "action": this.pstype,
        "account":environment.account,
        "region":environment.region
      };
      console.log(payload)
      this.refreshService.databaseInfo(this.scheduleAPI,payload,).subscribe(res => {
        console.log(res)
        this.scheduleevents();
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
    else  if(this.pstype == 'pia-status-check'){
      const payload = {
        "envname": localStorage.getItem("envname"),
        "action": this.pstype,
        "account":environment.account,
        "region":environment.region,
        "rate": this.schedulepsactivityForm.get('rate').value
      };
      console.log(payload)
      this.refreshService.databaseInfo(this.scheduleAPI,payload,).subscribe(res => {
        console.log(res)
        this.scheduleevents();
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
    
    
    else{
      console.log(this.schedulepsactivityForm.value,localStorage.getItem("envname"))
      this.schedulepsactivityForm.patchValue({
        "envname": localStorage.getItem("envname")
      })
      this.adohcpsactivityForm.patchValue({
        "envname": localStorage.getItem("envname")
      })
      localStorage.setItem("actionenv",JSON.stringify(this.schedulepsactivityForm.value))
        // const scheduleObj = this.getModelObject(this.scheduleInfo);
        const scope = this;
        const modalRef = this.modalService.open(UptimePolicyComponent, {
          size: 'xl',
          backdropClass: '.app-session-modal-backdrop',
          windowClass: '.app-session-modal-window',
          backdrop:'static'
        });
        modalRef.componentInstance.envData = this.pstype;
        modalRef.componentInstance.envData = this.psvalue;
        modalRef.componentInstance.envData = this.adohcpsactivityForm.get('version').value
    }
    }

    psservertype(){
      var scheduledate = this.servertypeform.value
      if(this.servertypeform.get('prcs').value == true){
        this.piacomponents.push("prcs")
      }
      if(this.servertypeform.get('web').value == true){
        this.piacomponents.push("web")
      }
      if(this.servertypeform.get('app').value == true){
        this.piacomponents.push("app")
      }
      console.log(this.piacomponents)
      localStorage.setItem("piacomponents",JSON.stringify(this.piacomponents))
      this.piacomponents.splice(0, this.piacomponents.length)
      console.log(this.piacomponents)
      this.activeModal.close(true);
      this.closeResult = `Dismissed ${this.getDismissReason('test')}`;
      console.log(this.piacomponents)

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

    openModals(content, size) {
      this.modalService.open(content, { size: size });
    }
    
    openModalsAghoc(content, size) {
      this.modalService.open(content, { size: size });
    }

    closeModal() {
      console.log("in close modal method");
    }

    savestates(index:number){
      const payload = {
        "EventName": this.items.Events[index].Name,
        "State": this.psactivitiesform.value.State, 
        "account":environment.account,
        "region":environment.region

      };
      console.log(payload)
      this.refreshService.databaseInfo(this.enabledisable,payload,).subscribe(res => {
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

    schedulescale(content:any,size) {
      this.modalService.open(content, { size: size })
      .result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
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

    deleteschedule(index:number){
      if(this.psactivitiesform.value.checkboxselect == true){
        var State = 'delete'
        const payload = {
          "EventName": this.items.Events[index].Name,
          "State": State ,
          "account":environment.account,
          "region":environment.region
        };
        console.log(payload)
        this.refreshService.databaseInfo(this.enabledisable,payload,).subscribe(res => {
          console.log(res)
          if(res['statuscode'] === 200){
            this.scheduleevents()
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
    } 
  }

