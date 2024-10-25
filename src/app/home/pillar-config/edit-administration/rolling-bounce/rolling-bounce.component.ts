import { stepObj, OSs } from './../../../../shared/constants/adminstration-constants';
import { StepModelComponent } from './../steps-edit/step-model/step-model.component';
import { forkJoin } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { EnvironmentService } from './../../../../services/environment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggerService } from './../../../../services/logger.service';
import { UtilService } from './../../../../services/util.service';
import { Component, Input, OnChanges, ViewChild, ViewContainerRef } from '@angular/core';

const DELETE = 'DELETE';
const SUBMIT = 'SUBMIT';
const SWAP = 'SWAP';

@Component({
  selector: 'rolling-bounce',
  templateUrl: './rolling-bounce.component.html',
  styleUrls: ['./rolling-bounce.component.scss']
})
export class RollingBounceComponent implements OnChanges {

  // constructor() { } ngOnInit() {}

  @Input()
  appName: string;
  @Input()
  envName: string;

  @ViewChild('fileUpload', { read: ViewContainerRef, static: false }) fileUpload: any;
  views = ['GRID-VIEW', 'DATA-VIEW', 'JSON-VIEW'];
  selectedView = this.views[0];

  toggle1 = false;
  toggle11 = false;
  addDomain = false;

  module = 'Administration';

  DELETE = DELETE;
  SUBMIT = SUBMIT;
  SWAP = SWAP;

  last = true;

  gridView: boolean = true;
  closeResult: string;
  editable: boolean = true;
  addNew: boolean = false;
  steps = [];
  originalSteps = [];
  selectAll = false;
  currentStep = '0';
  above: boolean = true;
  loading = false;
  fileToUpload: File = null;
  jsonViewData = null;
  selectedStep = null;
  selectedModelOption = '';
  stepToDelete = null;
  popupNote = '';
  popUpHeader = '';
  popUpAction = '';
  showActionPopUP = false;
  popObj = null;
  showUpload = false;
  editSPolicy = false;

  constructor(private utilService: UtilService,
    private loggerService: LoggerService,
    private envService: EnvironmentService,
    private modalService: NgbModal,
    private config: NgbModalConfig,
    private toastr: ToastrService,
  ) {
  }

  ngOnChanges() {

    if (this.envName) {
      this.loadSteps();
    }
  }

  onClickedOutside($event) {
    this.showUpload = false;
  }

  loadSteps() {
    this.loading = true;
    this.envService.getEnvSteps('', this.envName).subscribe(res => {
      if (res && res.steps) {
        const data = this.responseData(res);
        this.originalSteps = this.utilService.clone(data.steps);
        this.steps = this.utilService.clone(data.steps);
        this.validateSteps(false);
        this.formatSteps();
      }
      this.loading = false;
    }, err => {
      this.loading = false;
    });
  }

  responseData(res) {
    const data = {
      envName: res.envname.S,
      steps: []
    };
    res.steps.L.forEach(step => {
      const obj = {
        expectedTime: step.M.expectedTime.S,
        instanceID: step.M.instanceID.S,
        status: step.M.status.S,
        os: step.M.os.S,
        loading: true,
        valid: false,
        scriptExecution: step.M.scriptExecution.S,
        step: step.M.step.S,
        stepDescription: step.M.stepDescription.S,
      }
      data.steps.push(obj);
    });
    return data;
  }

  showSelectedView(view) {
    if (view === 'JSON-VIEW') {
      const jsonSteps = this.getStepsPayload().steps;
      this.jsonViewData = JSON.stringify(this.utilService.clone(jsonSteps), undefined, 4)
    }
    this.selectedView = view;
  }


  formatSteps() {
    this.steps.forEach((step, index) => {
      step.isEdit = false;
      step.step = index + 1;
      step.index = index;
      step.isNew = false;
    });

  }

  log(payload) {
    let correlationId = this.utilService.getCorelationId(`${this.envName}_steps`);
    this.loggerService.log(correlationId, this.module, this.envName, 'StepsUpdate', '', payload);

  }

  saveSteps() {
    this.loading = true;
    const payload = this.getStepsPayload();
    this.log(payload);
    this.envService.saveSteps('', payload).subscribe(res => {
      this.loadSteps();
      this.loading = false;
    }, err => {
      this.loading = false;
    })
    console.log(this.steps);
  }


  getStepsPayload() {
    const payload = {
      envname: this.envName,
      steps: []
    };
    this.steps.forEach(step => {
      payload.steps.push(
        {
          "expectedTime": step["expectedTime"] + '',
          "scriptExecution": step["scriptExecution"],
          "step": step["step"],
          "status": step["status"],
          "stepDescription": step["stepDescription"],
          "instanceID": step["instanceID"],
          "os": step["os"],
        }
      );
    });
    return payload;
  }

  resetSteps() {
    this.steps = this.utilService.clone(this.originalSteps);
  }


  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  requestUpload() {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.loadStepsFromFile(fileReader.result);
      this.fileUpload.element.nativeElement.value = null;
    }
    fileReader.readAsText(this.fileToUpload);
    this.fileToUpload = null;
  }

  loadStepsFromFile(filedata) {
    let data = JSON.parse(filedata);
    if (data && data.steps && data.steps.length > 0) {
      if (data.envname === this.envName) {
        data.steps.forEach(step => {
          step.loading = true;
          step.valid = false;
        })
        this.steps = data.steps;

        this.formatSteps();
        this.validateSteps(false);
      } else {
        this.fileToUpload = null;
        this.toastr.error('please upload valid File');
      }

    } else {
      this.fileToUpload = null;
      this.toastr.error('please upload valid File');
    }
  }
  reset() {
    this.steps = this.utilService.clone(this.originalSteps);
    this.formatSteps();
  }

  checkRecordToSwap(step, index, moveUp) {
    this.popupNote = `Do you want to move record from ${index + 1} or ${index + 2} ?`
    if (moveUp) {
      this.popupNote = `Do you want to move record from ${index + 1} or ${index} ?`;
    }
    this.popUpHeader = 'Swap Step'
    this.popUpAction = SWAP;
    this.showActionPopUP = true;
    this.popObj = {
      step,
      index,
      moveUp
    }

  }

  swapRecords(step, index, moveUp) {
    let currentStep = this.utilService.clone(step);
    let previousOrNextStep = null;
    let swappedIndex = index + 1;
    if (moveUp) {
      swappedIndex = index - 1
    }
    previousOrNextStep = this.steps[swappedIndex];
    this.steps[swappedIndex] = step;
    this.steps[index] = previousOrNextStep;
    this.formatSteps();
    this.cancelPopUp();
  }

  updateSteps() {
    console.log('steps Updating');
  }

  validateStep(step) {
    step.valid = true;
    step.valid = step.valid && step.validOS;
    step.valid = step.valid && step.validInstance;
    step.valid = step.valid && step.validExpectedTime;
    step.valid = step.valid && step.validStatus;
    step.valid = step.valid && step.validStepExecution;
    step.valid = step.valid && step.validStepDescription;
  }

  validateSteps(doSubmit: boolean) {
    this.loading = true;
    let validated = true;
    const observables = [];
    this.steps.forEach(step => {
      step.validStatus = step.status ? true : false;
      step.validStepExecution = step.scriptExecution ? true : false;
      step.validStepDescription = step.stepDescription ? true : false;
      this.validateOS(step);
      this.validateExpectedTime(step);
      observables.push(this.envService.validateInstance(step.instanceID));
    });

    forkJoin(observables).subscribe(data => {
      data.forEach((instanceRes, index) => {
        const step = this.steps[index];
        this.steps[index].validInstance = instanceRes.active;
        this.validateStep(step);
        step.loading = false;
        validated = validated && step.valid;
      });
      this.loading = false;
      if (validated) {
        if (doSubmit) {
          this.cancelPopUp();
          this.saveSteps();
        }
      } else {
        this.toastr.warning('Some Steps Contains Invalid Data');
      }
    }, err => {
      this.loading = false;

    });


  }



  validateOS(step) {
    const os = step.os ? step.os : '';
    step.validOS = OSs.indexOf(os) !== -1 ? true : false;

  }

  validateExpectedTime(step) {
    step.validExpectedTime = (step.expectedTime && !isNaN(step.expectedTime)) ? true : false;
  }


  editStep(currentStep) {
    const step = this.utilService.clone(currentStep);
    this.selectedStep = currentStep;
    this.selectedStep.edit = step;
    const scope = this;
    const modalRef = this.modalService.open(StepModelComponent, {
      size: 'md',
    });
    modalRef.result.then((result) => {
      console.log(result);
      scope.saveStep(scope.selectedStep);

    }, reason => {
      console.log(reason);
    });
    modalRef.componentInstance.step = this.selectedStep.edit;
  }






  addNewStep(currentStep) {
    this.currentStep = currentStep;
    let step = this.utilService.clone(stepObj);
    let index = 0;
    if (currentStep) {
      index = currentStep.index;
      index = index + 1;
    }
    step.index = index;
    step.step = index + 1;
    step.isNew = true;
    step.valid = true;
    step.validInstance = true;
    step.validExpectedTime = true;
    step.validStepExecution = true;
    step.validStatus = true;
    step.validOS = true;
    step.validStepDescription = true;
    this.editStep(step);

  }

  cancelEdit() {
    this.selectedStep.isEdit = false;
    this.selectedStep.edit = null;
  }

  cancelPopUp() {
    this.showActionPopUP = false;
    this.popUpAction = '';
    this.popupNote = '';
    this.popUpHeader = '';
  }

  proceedAction() {
    switch (this.popUpAction) {
      case DELETE:
        this.deleteStep();
        break;
      case SWAP:
        this.swapRecords(this.popObj.step, this.popObj.index, this.popObj.moveUp)
        break;
      case SUBMIT:
        this.validateSteps(true);
        break;

    }
  }

  cancelStep() {
    this.selectedStep.isEdit = false;
    this.selectedStep.edit = null;

  }


  saveStep(currentStep) {

    const editedStep = this.utilService.clone(currentStep.edit);
    currentStep.edit = null;
    Object.keys(editedStep).forEach(key => {
      currentStep[key] = editedStep[key];
    });
    if (editedStep.isNew) {
      this.steps.splice(currentStep.index, 0, currentStep);
    } else {
      this.steps.splice(currentStep.index, 1, currentStep);
    }
    this.formatSteps();
  }

  showActionPopUp(action?, step?, moveUp?) {
    console.log(action);
    this.popUpAction = action;
    switch (action) {
      case DELETE:
        this.popUpHeader = 'Delete Step';
        this.popupNote = `Do you really want to delete step ${step.step} ?`;
        this.popObj = step;
        break;
      case SWAP:
        this.popupNote = `Do you want to move record from ${step.index + 1} or ${step.index + 2} ?`
        if (moveUp) {
          this.popupNote = `Do you want to move record from ${step.index + 1} or ${step.index} ?`;
        }
        this.popUpHeader = 'Swap Step'
        this.popObj = {
          step,
          index: step.index,
          moveUp
        }
        break;
      case SUBMIT:
        this.popupNote = `Do you want to submit the steps?`
        this.popUpHeader = 'Submit'
        break;

    }
    this.showActionPopUP = true;
  }


  deleteStep() {
    this.steps.splice(this.steps.findIndex(step => step.index === this.popObj.index), 1);
    this.steps.forEach((step, index) => {
      step.index = index;
      step.step = index + 1;
    });
    this.cancelPopUp();

  }

  showDeleteStepPopUp(currentStep) {
    this.popUpAction = DELETE;
    this.popObj = currentStep;
    this.popUpHeader = 'Delete Step';
    this.popupNote = `Do you really want to step ${currentStep.step} ?`;
    this.showActionPopUP = true;
    //  this.stepToDelete = currentStep;
  }
  showSubmitPopup() {

  }



  downloadFile() {
    const jsonSteps = this.getStepsPayload();
    var dataStr = "data:application/json;charset=utf-8," + encodeURIComponent(JSON.stringify(jsonSteps, undefined, 4));
    var dlAnchorElem = document.getElementById('downloadAnchorElem');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `${this.envName}.json`);
    dlAnchorElem.click();
    this.toastr.success(`${this.envName}.json download Successfully`);


  }

}

