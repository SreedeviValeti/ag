import {Component, ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from 'src/app/services/notification.service';
import { RefreshService } from 'src/app/services/refresh.service';
import { environment } from 'src/environments/environment.prod';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'about-page',
    templateUrl: './about-page.component.html',
    styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent {
  migrationBaseUrl = localStorage.getItem('migrationbaseurl');
  aboutpageurl = `${this.migrationBaseUrl}activegenie/about-page`
  aboutpagevalues 
  closeResult: string = ''
  loading = false;
  
  constructor(public router: Router,
    private toastr: ToastrService,
    private notifService: NotificationService,
    private _eref: ElementRef,
    private refreshService: RefreshService,
    private modalService: NgbModal) {
  }

  ngOnInit() {
    this.aboutPage();
  }

  aboutPage(){
    this.loading = true;
    const payload = {
      "account":environment.account,
      "region":environment.region
    }
    this.refreshService.serviceNow(this.aboutpageurl,payload).subscribe(res => {
      this.aboutpagevalues =res 
      console.log(this.aboutpagevalues)
      this.loading = false
      if(res['errorMessage']){
        this.toastr.error(res['errorMessage'])
      }
      })
  }

  schedulescale(content:any,size) {
    this.modalService.open(content, { size: size })
    .result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
}
      
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }    
}