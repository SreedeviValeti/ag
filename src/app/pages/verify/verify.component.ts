import { Router } from '@angular/router';
import { UserRegistrationService } from './../../services/user-registration.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['../signin-page.scss']
})
export class VerifyComponent implements OnInit {
  verifyForm: FormGroup;
  loading = false;
  errorMessage = "";
  submitted = false;
  constructor(  private formBuilder: FormBuilder,
    public userRegistration: UserRegistrationService, 
    private router: Router,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
    this.verifyForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      code: ['', Validators.required]
    });
  }

  get f() { return this.verifyForm.controls; }


  onConfirmRegistration() {
   
    this.errorMessage = '';
    if (this.verifyForm.invalid) {
      return;
    }
    this.errorMessage = this.userRegistration.confirmRegistration(this.f.email.value, this.f.code.value, this);
    this.submitted = true;
    this.loading = true;
    console.log(this.errorMessage)
    // this.router.navigateByUrl('/verify');
  }

  cognitoCallback(message: string, result: any) {
    this.loading = false;
    console.log(result)
    if(result === 'SUCCESS'){
      this.toastr.success('User Successfully Verified ', 'Success');
    }
    else{
      this.toastr.error('Invalid Code', 'Failure');

    }
    if (message != null) { //error
      this.errorMessage = message;
    } else { //success
      this.router.navigateByUrl('/verify');
    }
  }

  pwdCognitoCallback(message: string, result: any) {
    
  }
  
  verfctnCognitoCallback(message: string) {
    console.log(message)
    
  }

}
