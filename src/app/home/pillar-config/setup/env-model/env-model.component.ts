import { InfraService } from 'src/app/services/infra.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EnvironmentService } from './../../../../services/environment.service';
import { ToastrService } from 'ngx-toastr';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-env-model',
  templateUrl: './env-model.component.html',
  styleUrls: ['./env-model.component.scss']
})
export class EnvModelComponent implements OnInit {

  @Input() pillarId;
  loading = false;
  

  env = new FormGroup({
    envName: new FormControl('', Validators.required),
    peopleTools: new FormControl('', Validators.required),
    application: new FormControl('', Validators.required),
    imageUpdate: new FormControl('', Validators.required)
  });

  constructor(public activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private infraService: InfraService,
    private envService: EnvironmentService) { }

  ngOnInit() {

  }

  dismiss() {
    this.activeModal.dismiss(false);
  }

  save() {
    this.loading = true;
    const body = this.env.value
    body['pillarID'] = this.pillarId;
    this.infraService.createEnv(body).subscribe(res => {
      this.loading = false;
      this.activeModal.close(true);
    }, err => {
      this.loading = false;
      this.toastr.show(err);
    })

  }

}
