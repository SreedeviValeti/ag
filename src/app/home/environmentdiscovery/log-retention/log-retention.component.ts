import {Component, Input, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RefreshService } from 'src/app/services/refresh.service';
import { environment } from 'src/environments/environment.prod';

@Component({
    selector: 'log-retention',
    templateUrl: './log-retention.component.html',
    styleUrls: ['./log-retention.component.scss']
})
export class LogRetentionComponent {
    
    loading = false
    migrationBaseUrl = localStorage.getItem('migrationbaseurl');
    logManagemnturl = `${this.migrationBaseUrl}peoplesoft/log-retention-fetch`;
    logUpdate = `${this.migrationBaseUrl}peoplesoft/log-retention-update`;
    logretention : FormGroup
    reponse:any


    constructor(private toastr: ToastrService,private refreshService: RefreshService,private formBuilder: FormBuilder)
    {}
 
    ngOnInit(){

      this.getLogs()
      this.logretention = this.formBuilder.group({
        account:['', [Validators.required]],
        envtype:['',[Validators.required]],
        envname:['',[Validators.required]],
        ExpirationDays: ['', [Validators.required]],
        region:['', [Validators.required]],
      });
    }

    getLogs(){
        this.loading = true
        var logRetentionPayload = {"account": environment.account, "region":environment.region,"envtype":localStorage.getItem("envty"), "envname": localStorage.getItem("envname")
    }
        this.refreshService.logsmanagement(logRetentionPayload,this.logManagemnturl).subscribe({
        next: (res) => {
            this.reponse = res
            this.loading = false
            console.log(res)
                }, 
                error: () => {
                    console.log(Error)
                }
            });
        } 
        updateLogs(){

            const updatePayload = {
            "account": environment.account, 
            "region":environment.region,
            "envtype":this.logretention.value.envtype,
             "envname": this.logretention.value.envname,
             "ExpirationDays":this.logretention.value.ExpirationDays
        }
            this.refreshService.logsmanagement(updatePayload,this.logUpdate).subscribe({
            next: (res) => {
                this.reponse = res
                console.log(res)
                    }, 
                    error: () => {
                        console.log(Error)
                    }
                });
        }
    } 