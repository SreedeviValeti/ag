import { InfraService } from './../../../../../services/infra.service';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Component, Input, OnInit, ɵɵresolveBody } from '@angular/core';
import { OSs } from '../../../../../shared/constants/adminstration-constants';
import { EnvironmentService } from '../../../../../services/environment.service';

@Component({
  selector: 'app-script-model',
  templateUrl: './script-model.component.html',
  styleUrls: ['./script-model.component.scss']
})


export class ScriptModelComponent implements OnInit {

  @Input() domainId;
  @Input() actionItem;
  @Input() domainObj;

  loading = false;

  actions = [
    "Start",
    "Stop",
    "Restart",
    "Clear Cache Restart",
    "Status"
  ];
  OSs = OSs;

  domain = new FormGroup({
    actionName: new FormControl('', Validators.required),
    scripts: new FormArray([])
  });

  scripts = this.domain.get('scripts') as FormArray;

  constructor(public activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private infraService: InfraService,
    private envService: EnvironmentService) { }

  ngOnInit() {
    if (!this.actionItem) {
      this.addScript();
    } else {

      (this.actionItem.scripts || []).forEach(item => {
        this.domain.get('actionName').setValue(this.actionItem.actionName);
        const script = new FormGroup({
          expectedTime: new FormControl(item.expectedTime, Validators.required),
          scriptExecution: new FormControl(item.scriptExecution, Validators.required),
          step: new FormControl(item.step, Validators.required),
          status: new FormControl(item.status, Validators.required),
          os: new FormControl(item.os, Validators.required),
          workingDirectory: new FormControl(item.workingDirectory),
          s3Location: new FormControl(item.s3Location)
        });
        this.scripts.push(script);
      });

      this.formatScripts();
    }
  }

  addScript() {

    const script = new FormGroup({
      expectedTime: new FormControl('', Validators.required),
      scriptExecution: new FormControl('', Validators.required),
      step: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      os: new FormControl('', Validators.required),
      s3Location:  new FormControl('', Validators.required),
      workingDirectory: new FormControl('', Validators.required)
    });
    this.scripts.push(script);
    this.formatScripts();

  }
  formatScripts() {
    this.scripts.controls.forEach((script, index) => {
      script.get("step").setValue(index + 1);

    });

  }


  removeScript(index: number) {
    this.scripts.removeAt(index);
    this.formatScripts();

  }



  dismiss() {
    this.activeModal.dismiss(false);
  }
  getPayload() {
    const payload = {
      domainID: this.domainId,
      actionName: this.domain.value.actionName,
      scripts: this.domain.value.scripts
    }
    return payload;
  }

  save() {
   

    if (this.domain.valid && this.scripts.length > 0) {
      this.loading = true;

      if (this.actionItem) {
       this.infraService.updateScripts(this.getPayload()).subscribe(res => {
        this.loading = false;
        this.activeModal.close(true);
      }, err => {
        this.loading = false;
        this.toastr.show(err);
      })
      }else{
        this.infraService.createScripts(this.getPayload()).subscribe(res => {
          this.loading = false;
          this.activeModal.close(true);
        }, err => {
          this.loading = false;
          this.toastr.show(err);
        })
      }
    } else {
      this.toastr.warning('Please Enter script values');
    }


  }

}
