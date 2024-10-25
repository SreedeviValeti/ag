import { CognitoCallback } from './../../services/auth/cognito.service';
import { UserRegistrationService } from './../../services/user-registration.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../signin-page.scss']
})
export class RegisterComponent implements OnInit, CognitoCallback {
  registerForm: FormGroup;
  loading = false;
  errorMessage = "";
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    public userRegistration: UserRegistrationService,
    private router: Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get f() { return this.registerForm.controls; }


  register() {
    this.submitted = true;
    this.errorMessage = '';
    if (this.registerForm.invalid) {
      return;
    }
    this.errorMessage = this.userRegistration.register(this.f.username.value, this.f.email.value, this.f.password.value, this);
    this.loading = false;


  }

  cognitoCallback(message: string, result: any) {
    this.loading = false;
    if (message != null) { //error
      this.errorMessage = message;
    } else { //success
      this.router.navigateByUrl('/verify');
    }
  }

  pwdCognitoCallback(message: string, result: any) {
    
  }
  
  verfctnCognitoCallback(message: string) {
    
  }


}
