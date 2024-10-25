import { InfraService } from '../../../../../services/infra.service';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Component, Input, OnInit, ɵɵresolveBody } from '@angular/core';
import { OSs } from '../../../../../shared/constants/adminstration-constants';
import { EnvironmentService } from '../../../../../services/environment.service';


const APP= 'app';
const SERVER= 'server';
const DOMAIN= 'domain';
const SCRIPT= 'script';
@Component({
  selector: 'app-script-model',
  templateUrl: './env-delete-type-model.component.html',
  styleUrls: ['./env-delete-type-model.component.scss']
})


export class EnvDeleteComponentModelType implements OnInit {

  @Input() envData;
  @Input() selectedTypeObj;
  @Input() parentObj;
  @Input() activityId;
  loading = false;

  message = ''
  deleteMethod;



  constructor(public activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private infraService: InfraService,
    private envService: EnvironmentService) { }

  ngOnInit() {
    this.setDeleteType();
  }

  setDeleteType() {
    switch (this.selectedTypeObj.deletedType) {
      case APP:
        this.deleteMethod = this.deleteApp;
        this.message = `Do you want to delete ${this.selectedTypeObj.appName}`
        break;
      case SERVER:
        this.deleteMethod = this.deleteServer;
        this.message = `Do you want to delete ${this.selectedTypeObj.hostName}`
        break;
      case DOMAIN:
        this.deleteMethod = this.deleteDomain;
        this.message = `Do you want to delete ${this.selectedTypeObj.domainName}`
        break;
      case SCRIPT:
        this.deleteMethod = this.deleteActionItem;
        this.message = `Do you want to delete ${this.selectedTypeObj.actionName}`
        break;
    }
  }

  dismiss() {
    this.activeModal.dismiss(false);
  }

  onSave() {
    this.deleteMethod();
  }

  deleteApp() {
    this.loading = true;
    this.infraService.deleteApp(this.selectedTypeObj.appID,this.activityId).subscribe(res=>{
      this.loading = false;
      this.activeModal.close(true);
      this.toastr.success(`${this.selectedTypeObj.appName} deleted`);
    },err=>{
      this.loading = false;
      this.toastr.error(`Error in deleting ${this.selectedTypeObj.appName}`);
    })
  }

  deleteServer() {

    const hostID=this.selectedTypeObj.hostID
    const appID= this.parentObj.appID
    this.loading = true;
    this.infraService.deleteServer(appID, hostID).subscribe(res=>{
      this.loading = false;
      this.activeModal.close(true);
      this.toastr.success(`${this.selectedTypeObj.hostID} deleted`);
    },err=>{
      this.loading = false;
      this.toastr.error(`Error in deleting ${this.selectedTypeObj.hostID}`);
    })

  }
  deleteDomain() {
    this.loading = true;
    const hostID=this.parentObj.hostID
    const domainID= this.selectedTypeObj.domainID
    this.infraService. deleteDomain(domainID, hostID).subscribe(res=>{
      this.loading = false;
      this.activeModal.close(true);
      this.toastr.success(`${this.selectedTypeObj.domainName} deleted`);
    },err=>{
      this.loading = false;
      this.toastr.error(`Error in deleting ${this.selectedTypeObj.domainName}`);
    })

  }
  deleteActionItem() {
    this.loading = true;
    const domainID=this.parentObj.domainID
    const actionName= this.selectedTypeObj.actionName
    this.infraService.deleteActionItem(domainID, actionName).subscribe(res=>{
      this.loading = false;
      this.activeModal.close(true);
      this.toastr.success(`${this.selectedTypeObj.actionName} deleted`);
    },err=>{
      this.loading = false;
      this.toastr.error(`Error in deleting ${this.selectedTypeObj.actionName}`);
    })
  }

  save() {
    this.dismiss();
  }




}
