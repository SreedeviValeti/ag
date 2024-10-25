import {Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RefreshService } from 'src/app/services/refresh.service';
import { environment } from 'src/environments/environment.prod';

@Component({
    selector: 'inv-users',
    templateUrl: './inv-users.component.html',
    styleUrls: ['./inv-users.component.scss']
})
export class InvUsersComponent {

    loading = false;
    invForm : FormGroup

    constructor(private toastr: ToastrService,private refreshService: RefreshService,private formBuilder: FormBuilder)
    {}
 
    ngOnInit(){
        this.invForm = this.formBuilder.group({
            firstname:['', [Validators.required]],
            lastname:['',[Validators.required]],
            emailid:['',[Validators.required]],
            account: ['', [Validators.required]],
            region:['', [Validators.required]],
          });
    }
    migrationBaseUrl = localStorage.getItem('migrationbaseurl');
    getUsersUrl = `${this.migrationBaseUrl}activegenie/invite-a-user`;

    CreateInvUsers(){

        // const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // const email = currentUser.userdetails.email;
        // var logRetentionPayload = {
        //     "accountid": environment.account, 
        //     "region":environment.region,
        //     "user_email":email
        // }
        this.invForm.patchValue({
            "region":environment.region
          })
          this.invForm.patchValue({
            "account":environment.account
          })
        console.log(this.invForm.value)
        this.refreshService.invUsers(this.invForm.value,this.getUsersUrl).subscribe({
        next: (res) => {
            console.log(res)
                }, 
                error: () => {
                    console.log(Error)
                }
            });
        } 
}
