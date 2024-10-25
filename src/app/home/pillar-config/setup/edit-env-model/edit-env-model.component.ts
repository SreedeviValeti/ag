import { InfraService } from 'src/app/services/infra.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EnvironmentService } from '../../../../services/environment.service';
import { ToastrService } from 'ngx-toastr';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-env-edit-model',
  templateUrl: './edit-env-model.component.html',
  styleUrls: ['./edit-env-model.component.scss']
})
export class EditEnvModelComponent implements OnInit {

  @Input() environment;

  @Input()
  pillarId

  loading = false;


  env = new FormGroup({
    envID: new FormControl('', Validators.required),
    envName: new FormControl('', Validators.required),
    peopleTools: new FormControl('', Validators.required),
    application: new FormControl('', Validators.required),
    imageUpdate: new FormControl('', Validators.required)
  });

  constructor(public activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private infraService: InfraService,
    private envService: EnvironmentService) {

     }

  ngOnInit() {
   this.env.setValue(this.environment);
  }

  dismiss() {
    this.activeModal.dismiss(false);
  }

  save() {
    this.loading = true;
    let body = this.env.value
    body['pillarID'] = this.pillarId;
    console.log(body);

    //  body['pillarID'] = this.pillarId;
    this.infraService.editEnv(body).subscribe(res => {
      this.loading = false;
      this.activeModal.close(true);
    }, err => {
      this.loading = false;
      this.toastr.show(err);
    })

  }

}
