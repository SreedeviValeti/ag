import { Router } from '@angular/router';
import { UserLoginService } from './../../services/auth/user-login.service';
import { PermissionService } from 'src/app/services/auth/permission.service';
import { CognitoCallback } from './../../services/auth/cognito.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['../signin-page.scss']
})
export class ForgotPasswordComponent implements OnInit, CognitoCallback {

  loading = false;
  forgotForm: FormGroup;
  verfErrorMessage = "";
  submitted = false;
  verifyCode = false;
  forgetPwd = true;
  errorMessage: string;
  constructor(private formBuilder: FormBuilder,
    public router: Router,
    private permService: PermissionService,
    private userService: UserLoginService
  ) { }

  ngOnInit() {
    this.forgotForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      verfctnCode: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  diableVerfctnDialg() {
    this.forgetPwd = true;
    this.verifyCode = false;
    this.verfErrorMessage = "";
    this.errorMessage = "";
  }

  pwdCognitoCallback(message: string, result: any) {
    this.loading = false;
    if (message == null && result == null) { //error
      this.forgetPwd = false;
      this.verifyCode = true;
      this.errorMessage = "";
      this.submitted = false;
    } else { //success
      this.errorMessage = message;
    }
  }

  cancel() {
    this.forgetPwd = true;
    this.verifyCode = false;
    this.errorMessage = "";
    this.submitted = false;
  }

  verfctnCognitoCallback(message: string, result: any) {
    this.loading = false;
    if (message != null) { //error
      this.verfErrorMessage = message;
    } else { //success
      this.router.navigate(['/login']);
    }
  }

  cognitoCallback(message: string, result: any) {


  }

  get f() { return this.forgotForm.controls; }

  resetPwd() {
    if (this.f.password.valid && this.f.verfctnCode.valid
    ) {

      this.loading = true;
      this.verfErrorMessage = '';
      this.errorMessage = this.userService.confirmNewPassword(this.f.email.value,
        this.f.verfctnCode.value, this.f.password.value, this);
    }
  }


  next() {
    this.submitted = true;
    this.errorMessage = '';
    this.verfErrorMessage = '';
    if (this.f.email.invalid) {
      this.errorMessage = 'Please Enter Valid Email';
      return;

    }
    this.loading = true;
    this.errorMessage = this.userService.forgotPassword(this.f.email.value, this);

  }
}

