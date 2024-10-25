import {Component} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RefreshService } from 'src/app/services/refresh.service';
import { environment } from 'src/environments/environment.prod';

@Component({
    selector: 'status-board',
    templateUrl: './status-board.component.html',
    styleUrls: ['./status-board.component.scss']
})

export class StatusBoardComponent {

    migrationBaseUrl = localStorage.getItem('migrationbaseurl');;
    statusBoardURl = `${this.migrationBaseUrl}activegenie/status-board`;
    constructor(private refreshService: RefreshService,private toastr: ToastrService, private formBuilder: FormBuilder)
    {}

    ngOnInit(){
        this.getSatusBordValues()
      } 
      
    getSatusBordValues(){
        const payload = {"account":environment.account ,"region":environment.region}
        this.refreshService.getStatusBoard(this.statusBoardURl,payload).subscribe(res => {
            console.log(res)
        })         
    }     
}