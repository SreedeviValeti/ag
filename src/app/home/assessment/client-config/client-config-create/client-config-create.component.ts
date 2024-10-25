import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AssessmentService } from './../../../../services/assessment.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-config-create',
  templateUrl: './client-config-create.component.html',
  styleUrls: ['./client-config-create.component.scss']
})
export class ClientConfigCreateComponent implements OnInit {
  amiSource = ["CIS Benchamarks","Amazon"]


  loading = false;


  app = this.fb.group({
    envName: ['', Validators.required],
    peopleTools: ['', Validators.required],
    application: ['', Validators.required],
    imageUpdate: ['', Validators.required]
  });

  constructor(private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private service: AssessmentService) { }

  ngOnInit() {

  }

  dismiss() {
    this.activeModal.dismiss(false);
  }

  save() {
    this.activeModal.close(true);
    /*   this.loading = true;
      const body = this.env.value
      body['pillarID'] = this.pillarId;
      this.infraService.createEnv(body).subscribe(res => {
        this.loading = false;

      }, err => {
        this.loading = false;
        this.toastr.show(err);
      }) */

  }
}
