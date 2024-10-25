import { ScheduleEditModelComponent } from '../sechedule-edit-model/sechedule-edit-model.component';
import { RefreshService } from '../../../../services/refresh.service';
import { REFRESHSTEPS } from '../../../../shared/constants/adminstration-constants';
import { UtilService } from '../../../../services/util.service';
import { AuthenticationService } from '../../../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { EnvironmentService } from '../../../../services/environment.service';
import { Component, OnChanges, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InfraService } from '../../../../services/infra.service';
import { LoggerService } from '../../../../services/logger.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from "../../../../../environments/environment.prod";
import * as moment from 'moment';
import * as _ from 'lodash';
import { getLocaleTimeFormat } from '@angular/common';

@Component({
  selector: 'database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.scss']
})
export class DatabbaseComponent implements OnInit {

  loading = false;
  disableRefreshButtonFlag =true;
  @Input()
  envData;
  databaseData;
  migrationBaseUrl = localStorage.getItem('migrationbaseurl');
  dburl = `${this.migrationBaseUrl}activegenie/rdsdiscovery`
  snapshoturl = `${this.migrationBaseUrl}activegenie/rdssnapshots`

//   body= {
//     "source": "aws.apigateway",
//     "DBInstanceIdentifier": "fsdmo",
//     "account":environment.account
// }
// snapshotbody= {
//   "DBInstanceIdentifier": "fsdmo",
//   "account":environment.account

// }

constructor( private refreshService: RefreshService,
  private toastr: ToastrService,
  ){}
  
ngOnInit() {
  // this.refreshService.databaseInfo(this.dburl,this.body,).subscribe(res => {
  //   this.loading = true;
  //   this. disableRefreshButtonFlag = false;
  //   this.databaseData = res
  //   this. disableRefreshButtonFlag = true;
  //   this.loading =false
  //   console.log(res)
  // }, err => {
  //   // this.toastr.error('failed');
  // })
}
snapshot(){
//   this.loading = true;
//   this.refreshService.snapShot(this.snapshoturl,this.snapshotbody).subscribe(res => {
//     // this.databaseData = res
//     this.loading = false;
//    this. disableRefreshButtonFlag = false;
//     console.log(res)
//   }, err => {
//     // this.loading = false;
//     // this.toastr.error('failed');
//   })
// }
// this.refreshService.snapShot(this.snapshoturl,this.snapshotbody).subscribe(res => {
//   this.loading = false;
//   this.disableRefreshButtonFlag = true
//   //this.databaseData = res
//   console.log(res)
// }, err => {
//   //this.loading = false;
//   this.toastr.error('failed');
// })

}
}
