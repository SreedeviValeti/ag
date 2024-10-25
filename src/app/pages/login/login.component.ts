import { LoggerService } from './../../services/logger.service';
import { UtilService } from './../../services/util.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from './../../services/auth/auth.service';
import { User } from './../../shared/model/user';
import { PermissionService } from 'src/app/services/auth/permission.service';
import { CognitoCallback } from 'src/app/services/auth/cognito.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../signin-page.scss']
})
export class LoginComponent implements OnInit, CognitoCallback {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  errorMessage: string;
  module = 'login';

  constructor(
    private permService: PermissionService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private utilService: UtilService,
    private loggerService: LoggerService,
    private authService: AuthenticationService) {
    if (this.permService.getUserName()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.errorMessage= this.permService.authenticate(this.f.username.value, this.f.password.value, this);
    this.loading = false
  }
  pwdCognitoCallback(message: string, result: any) {

  }

  verfctnCognitoCallback(message: string, result: any) {

  }

  cognitoCallback(message: string, result: any) {
    this.loading = false;
    if (message != null) {
      this.errorMessage = message;
      if (this.errorMessage === 'User is not confirmed.') {
        this.router.navigate(['/confirmRegistration', this.f.username.value]);
      } else if (this.errorMessage === 'User needs to set password.') {
        this.router.navigate(['/newPassword']);
      }
    } else {
      const user = new User(result['accessToken'].jwtToken,
        result['idToken'].jwtToken, result['idToken'].payload,
        result['idToken'].payload['username']);
      this.authService.setCurrentUser(user);
      let correlationId = this.utilService.getCorelationId('login');
      this.loggerService.log(correlationId, this.module, this.module,'User Logging in','N/A');

      this.router.navigate([this.returnUrl]);

    }
  }

}
