import { OSs } from './../../../../../shared/constants/adminstration-constants';
import { EnvironmentService } from './../../../../../services/environment.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'step-model',
  templateUrl: './step-model.component.html',
  styleUrls: ['./step-model.component.scss']
})
export class StepModelComponent {

  @Input() step;
  OSs = OSs;

  validating = false;

  constructor(public activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private envService: EnvironmentService) { }


  validateInstance(msg) {
    const invalidInstanceIDMsg = 'Please enter valid Instance ID'
    let instanceValidated = false;
    this.envService.validateInstance(this.step.instanceID).subscribe((result: any) => {
      if (result.active) {
        this.step.validInstance = true;
        instanceValidated = true;
      } else {
        this.step.validInstance = false;
        msg = msg + invalidInstanceIDMsg
      }
      if (msg.length > 0) {
        this.toastr.warning(msg);
      } else {
        this.step.validInstance = true;
        this.validateStep();
        this.updateStep();

      }
      this.validating = false;
      console.log(result);
    }, err => {
      console.log(err);
      msg = msg + invalidInstanceIDMsg;
      this.validating = false;
    })

  }

  validateStep() {
    this.step.valid = true;
    this.step.valid = this.step.valid && this.step.validOS;
    this.step.valid = this.step.valid && this.step.validInstance;
    this.step.valid = this.step.valid && this.step.validExpectedTime;
    this.step.valid = this.step.valid && this.step.validStatus;
    this.step.valid = this.step.valid && this.step.validStepExecution;
    this.step.valid = this.step.valid && this.step.validStepDescription;
  }

  dismiss() {
    this.activeModal.dismiss(true);
  }

  updateStep() {
    console.log(this.step);
    this.activeModal.close(true);
  }



  save() {
    this.step.valid = false;
    this.validating = true;
    const os = this.step.os;
    let msg = '';
    const osValidated = OSs.indexOf(os) !== -1 ? true : false;
    this.step.validOS = true;
    if (!osValidated) {
      this.step.validOS = false;;
      msg = 'Please Select Operating System;  <\br>'
    }
    this.step.validExpectedTime = true;
    const expectedTimeValidation = (this.step.expectedTime && !isNaN(this.step.expectedTime)) ? true : false;
    if (!expectedTimeValidation) {
      this.step.validExpectedTime = false;
      msg = msg + ' Please Enter valid expectedTime;  <\br>'
    }

    this.step.validStatus = true;
    if (!this.step.status) {
      this.step.validStatus = false;
      msg = msg + ' Please Enter valid status;  <\br>'
    }
    this.step.validStepExecution = true;
    if (!this.step.scriptExecution) {
      this.step.validStepExecution = false;
      msg = msg + ' Please Enter valid stepDescription;  <\br>'
    }
    this.step.validStepDescription = true;
    if (!this.step.stepDescription) {
      this.step.validStepDescription = false;
      msg = msg + ' Please Enter valid stepDescription;  <\br>'

    }

    this.step.validInstance = true;
    if (this.step.instanceID) {
      this.validateInstance(msg);
    } else {
      this.step.validInstance = false;
      msg = msg + 'Please enter Instance ID.';
      this.toastr.warning(msg);
      this.validating = false;
    }

  }










}
