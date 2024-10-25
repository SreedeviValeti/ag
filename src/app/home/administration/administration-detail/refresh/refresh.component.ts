import { ScheduleEditModelComponent } from './../sechedule-edit-model/sechedule-edit-model.component';
import { RefreshService } from './../../../../services/refresh.service';
import { REFRESHSTEPS } from './../../../../shared/constants/adminstration-constants';
import { UtilService } from './../../../../services/util.service';
import { AuthenticationService } from './../../../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { EnvironmentService } from './../../../../services/environment.service';
import { Component, OnChanges, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InfraService } from './../../../../services/infra.service';
import { LoggerService } from './../../../../services/logger.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import * as moment from 'moment';

import * as _ from 'lodash';
import { getLocaleTimeFormat } from '@angular/common';

@Component({
  selector: 'refresh',
  templateUrl: './refresh.component.html',
  styleUrls: ['./refresh.component.scss']
})
export class RefreshComponent implements OnInit {

  loading = false;

  module = 'Administration';

  @Input()
  envData;


  metaloaded = false;

  @Output()
  showRefreshModel = new EventEmitter<any>();

  envRefreshObj: any = {};

  activityId = '';
  steps = [];
  hideRefAndStatusButton = false;

  activity = 'refresh'
  displayRefreshModal = false;
  disableRefreshButtonFlag = false;
  lastRefreshDateTime = '';

  refreshMsgs = {
    refreshMsg: 'Environment Refresh',
    refreshHeader: 'Do you really want to refresh the Environment ?'
  }
  @Output()
  postRefresh = new EventEmitter<any>();

  scheduleInfo: any;
  scheduled = false;


  editRefresh = false;
  refreshHeading: any;

  scheduleEditObj = {
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    cronExp: ''
  };

  cronSchedule = false;
  rateSchedule = false;
  cronRateSchedule = true;


  constructor(private infraService: InfraService,
    private loggerService: LoggerService,
    private envService: EnvironmentService,
    private toastr: ToastrService,
    private authService: AuthenticationService,
    private utilService: UtilService,
    private modalService: NgbModal,
    private refreshService: RefreshService) { }

  ngOnInit() {
    (this.envData.activities || []).forEach(activity => {
      if (activity.activityName === this.activity) {
        this.activityId = activity.activityID;
      }
    });
    if (this.activityId) {
      this.loadActivityData();
      this.getScheduleInfo();
    }
  }

  getScheduleInfo() {
    this.loading = true;
    const envName = this.envData.envName;
    this.refreshService.getScheduleInfo(envName, this.activityId).subscribe(res => {
      console.log(res);
      this.loading = false;
      if (res && Object.keys(res).length > 0) {
        this.scheduled = true;
        this.scheduleInfo = res;

      } else {
        this.scheduled = false;
      }
    })
  }

  getEnvRefreshObj() {
    return this.envRefreshObj;
  }

  loadActivityData() {
    this.getRefreshSteps();
    this.getActivityStatus();
  }

  getRefreshSteps() {
    this.envService.getEnvSteps(this.activity, this.activityId).subscribe(res => {
      if (res && res[REFRESHSTEPS]) {
        this.steps = this.utilService.clone(res[REFRESHSTEPS]);
        this.hideRefAndStatusButton = this.steps.length == 0;
      }
    }, err => {
    });
  }

  callActivityStatus() {
    return this.infraService.getEnvRefreshStatus(this.activityId);
  }

  getActivityStatus() {
    this.loading = true;
    this.infraService.getEnvRefreshStatus(this.activityId).subscribe(
      (data: any) => {
        this.loading = false;

        this.envRefreshObj['enableActivity'] = data.enableRefresh;
        this.envRefreshObj['currentStatus'] = data.currentStatus;
        this.envRefreshObj['envDescription'] = data.envDescription;
        this.envRefreshObj['envStatusMsg'] = data.envDescription;

        this.lastRefreshDateTime = data.lastRefreshDateTime;
        if (this.envRefreshObj['enableActivity']) {
          this.disableRefreshButtonFlag = false;
        } else {
          this.disableRefreshButtonFlag = true;
          this.postRefresh.next({ scope: this, envRefreshObj: this.envRefreshObj });
        }
      }, err => this.loading = false
    );
  }

  enableRefreshModal() {
    if (this.checkAccess()) {
      const msgs = this.utilService.clone(this.refreshMsgs);
      this.showRefreshModel.next({
        scope: this,
        msgs
      });
    }
  }

  checkAccess() {
    let access = this.authService.hasGrants();
    if (!access) {
      this.toastr.warning('You don\'t have access', 'Warning');
    }
    return access;
  }

  refresh() {
    this.envRefresh();
  }

  envRefresh() {
    const envName = this.envData.envName;
    const envID = this.envData.envID;
    this.loading = true;
    let correlationId = this.utilService.getCorelationId(envName);
    this.loggerService.log(correlationId, this.module, envName, 'Environment Refresh', '');
    const payload = {
      'refreshID': this.activityId,
      envName,
      envID,
    }
    this.infraService.refreshEnvironment(payload).subscribe(
      (data: any) => {
        this.envRefreshObj['enableRefresh'] = data.enableRefresh;
        this.envRefreshObj['currentStatus'] = data.currentStatus;
        this.envRefreshObj['envDescription'] = data.envDescription;
        this.envRefreshObj['envStatusMsg'] = data.envDescription;
        this.toastr.success(this.envRefreshObj['envStatusMsg'], "REFRESH ENVIRONMENT STATUS");
        this.loading = false;
        if (!this.envRefreshObj.enableRefresh) {
          this.postRefresh.next({ scope: this, envRefreshObj: this.envRefreshObj });
        }

      }, err => {
        this.loading = false;
        this.toastr.error("REFRESH ENVIRONMENT Failed");
      }
    );

  }

  createOrUpdateScheduleInfo(sceduleInfo) {
    const startDate = sceduleInfo.startDate;
    const endDate = sceduleInfo.endDate;
    const startTime = sceduleInfo.startTime;
    const endTime = sceduleInfo.endTime;
    const sDateString = `${startDate}T${startTime}:00Z`;
    const eDateString = `${endDate}T${endTime}:00Z`;
    const payload = {
      "StartDate": sDateString,
      "EndDate": eDateString,
      "Schedule": `cron(${sceduleInfo.cronExp})`,
      "id": this.activityId,
      "envName": this.envData.envName,
      "envID": this.envData.envID,
      Enabled: sceduleInfo.enabled
    };
    this.loading = true;
    this.refreshService.createSchedule(payload, !this.scheduled).subscribe(res => {
      this.loading = false;
      this.getScheduleInfo();
    }, err => {
      this.loading = false;
      this.toastr.error('failed');
    })

  }

  getModelObject(scheduleEditObj) {
    let obj = {
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      cronExp: '',
      enabled: false
    };
    if (this.scheduleInfo && Object.keys(this.scheduleInfo).length > 0) {
      const sDate = scheduleEditObj.StartDate;
      const eDate = scheduleEditObj.EndDate;
      if (sDate) {
        const sDateSplit = sDate.split("T");
        obj.startDate = sDateSplit[0];
        obj.startTime = `${sDateSplit[1].split(':')[0]}:${sDateSplit[1].split(':')[1]}`;
      }
      if (eDate) {
        const eDateSplit = eDate.split("T");
        obj.endDate = eDateSplit[0];
        obj.endTime = `${eDateSplit[1].split(':')[0]}:${eDateSplit[1].split(':')[1]}`;

      }
      const cron = scheduleEditObj.Schedule ?
        scheduleEditObj.Schedule.split("cron(")[1].split(")")[0] : '';

      obj.cronExp = cron;
      obj.enabled = scheduleEditObj.Enabled;
    }
    return obj;

  }

  openModal() {

    const scheduleObj = this.getModelObject(this.scheduleInfo);
    const scope = this;
    const modalRef = this.modalService.open(ScheduleEditModelComponent, {
      size: 'xl',
      backdropClass: '.app-session-modal-backdrop',
      windowClass: '.app-session-modal-window',
      backdrop: 'static'

    });
    modalRef.result.then((result) => {
      scope.createOrUpdateScheduleInfo(scheduleObj);

    }, reason => {
      console.log(reason);
    });
    modalRef.componentInstance.scheduleEditObj = scheduleObj;
    modalRef.componentInstance.invokeCmp();
  }

  getCstDate(dateString) {
    return this.utilService.getCstDate(dateString);
  }
  toUTCFormat(dateString) {
    return this.utilService.toUTCFormat(dateString);
  }



}
