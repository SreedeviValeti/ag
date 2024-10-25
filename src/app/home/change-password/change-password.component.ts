import { UtilService } from './../../services/util.service';
import { LoggerService } from './../../services/logger.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PermissionService } from './../../services/auth/permission.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MustMatch } from '../../services/util.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;
  submitted = false;

  errormessage: string;
  loading = false;
  module ='password Change'


  constructor(public router: Router,
    private permService: PermissionService,
    private utilService: UtilService,
    private loggerService: LoggerService,
    private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      newpassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
  }, {
      validator: MustMatch('newpassword', 'confirmPassword')
  });
  }

  get f() { return this.changePasswordForm.controls; }

  updatePwd() {
    if (this.changePasswordForm.invalid) {
      this.errormessage = "All Fields are required";
      console.log("All Fields are required");
    } else if (this.f.newpassword.value != this.f.confirmPassword.value) {
      this.errormessage = "Passwords do not match";
      console.log("Passwords do not match");
    } else {
      this.loading = true;
      let correlationId =  this.utilService.getCorelationId('changePassword');
      this.loggerService.log(correlationId,this.module,this.module,'User Changing Password','N/A');
   
      this.permService.changePassword(this.f.password.value, this.f.confirmPassword.value, this.changepasswordCallback.bind(this));
      // this.errormessage = this.currentpassword + "///" + this.newpassword + "===" + this.confrimnewpassword;
    }
  }
  changepasswordCallback(err, result) {
    this.loading = false;
    if(err && err.message){
      this.errormessage = err.message;
      // this.showEnvStatusNotifcatn("Failed", err.message, 'danger');
    }
    if (result === 'SUCCESS') {
      // this.showEnvStatusNotifcatn("Sucess", 'Password Successfully updated');
      this.cancel();
    }
  }

  cancel() {
    let url = localStorage.getItem('previousUrl') || "";
    this.router.navigate([url]);
  }


}
