import { AssessmentService } from './../../../../services/assessment.service';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormBuilder } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-config-edit',
  templateUrl: './client-config-edit.component.html',
  styleUrls: ['./client-config-edit.component.scss']
})
export class ClientConfigEditComponent implements OnInit {

  loading = false;

  @Input() application;


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
  

  
}

}
