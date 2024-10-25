import { AssessmentService } from './../../../../services/assessment.service';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormBuilder } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-config-view',
  templateUrl: './client-config-view.component.html',
  styleUrls: ['./client-config-view.component.scss']
})
export class ClientConfigViewComponent implements OnInit {

  loading = false;

  @Input() application;
  apps: any = [];


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
    this.appDetails();

  }

  appDetails(){
      this.loading = true;
      this.apps = [];
      this.service.getApps().pipe().subscribe({
        next: (res) => {
          this.loading = false;
          this.apps = res;
          console.log(this.apps)
        }, error: () => {
          this.loading = false;
        }
      });
  
    
  }

  dismiss() {
    this.activeModal.dismiss(false);
  }

  save() {
    this.activeModal.close(true);
  

  
}
}
