import { FormControl } from '@angular/forms';
import { EnvironmentService } from './../../../services/environment.service';
import { NotificationService } from './../../../services/notification.service';
import { UtilService } from './../../../services/util.service';
import { LoggerService } from './../../../services/logger.service';
import { InfraService } from './../../../services/infra.service';
import { AuthenticationService } from './../../../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, EventEmitter, OnInit, Output, Input, DoCheck } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LOADCACHESTEPS, REFRESHSTEPS } from '../../../shared/constants/adminstration-constants';


@Component({
  selector: 'administration-detail',
  templateUrl: './administration-detail.component.html',
  styleUrls: ['./administration-detail.component.scss']
})
export class AdministrationDetailComponent implements OnInit {

  activities = {
    refresh: 'refresh',
    loadCache: 'LoadCache'
  }

  LOADCACHESTEPS = 'loadCacheSteps';
  REFRESHSTEPS = 'refreshSteps';

  envName: string;
  adminType: string;
  appName: string;

  tabComponent: any;

  module = 'Administration';

  currentOrientation: 'horizontal';


  editLogfile = false;
  editSPolicy = false;
  editBackupConfig = false;
  editBackup = false;
  backupTitle: any;
  editRefresh = false;
  editRefreshPolicy = false;
  refreshHeading: any;

  hideRefAndStatusButton = true;
  selectedDomains = {};
  selectedReferenceId = '';
  loading = false;
  token: string;
  email: string;
  environmentDetails: any = {};
  defaultServers = ["APP", "WEB", "DB", "PRCS"];
  servers = [];

  envStatusMsg: string;
  displayDomainModal = false;
  displayRefreshModal = false;
  app: string;
  serverName: string;
  domainName: string;
  action: string;
  selectedDomain: any;

  domaiStatusUrls = [];
  serverStatusObj = {};
  serversInProgress = {};

  tabs: any;
  selectedTab: string;
  //==============================================

  activityProcessing = true;
  activityDescription = '';
  envId;
  pillarId;
  envData;
  domainActivityId;
  refreshId;
  domainActivity = "psDomainActions";
  refreshActivity = "refresh";

  activityObj = {
    refresh: {
      prop: REFRESHSTEPS,
      tab: { title: 'refresh', desc: 'Refresh' }
    },
    LoadCache: {
      prop: LOADCACHESTEPS,
      tab: { title: 'loadCache', desc: 'Load Cache' }
    }
  }

  domainsInProgress = {};
  disableRefreshButton = true;
  disableRefreshButtonFlag = true;
  disableServerStatusesLoad = false;
  lastRefreshDateTime = '';
  envRefreshObj = {
    envDescription: '',
    currentStatus: '',
    enableRefresh: '',
    envStatusMsg: ''
  };

  enableRefresh = true;
  domainStatusObj = {};
  steps = [];
  envMeta;

  @Output()
  closePage = new EventEmitter<boolean>();


  refreshMsg: '';
  refreshHeader: '';

  baseTabs = [
    { title: 'details', desc: 'Domain Info' },
    { title: 'database', desc: 'Database' },
     { title: 'logManagement', desc: 'Log Management' },
     { title: 'uptimePolicy', desc: 'Uptime Policy' },
    //  { title: 'Patching', desc: 'Patching' },
      // { title: 'backup', desc: 'Backup' },
      { title: 'refreshschedule', desc: 'Refresh Schedule' } 
  ]

  /* Log Managemenr Days */
  logArchiveDays = '60 Days';
  logPurgeDays = '120 Days';
  hostName: string;
  instanceID: string;

  passPhrase = new FormControl('');
  enableRefreshBtn


  constructor(private actvRoute: ActivatedRoute,
    private router: Router,
    private infraService: InfraService,
    private authService: AuthenticationService,
    private loggerService: LoggerService,
    private utilService: UtilService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private envService: EnvironmentService,
    private notifService: NotificationService
  ) { }

  ngOnInit() {
    this.passPhrase.valueChanges.subscribe(value => {
      this.enableRefreshBtn = value === this.envData.envName;
    });

    this.tabs = this.utilService.clone(this.baseTabs);
    this.actvRoute.params.subscribe(
      params => {
        this.envId = params['envId'];
        this.pillarId = params['pillarId'];
        this.getEnvironmentDetails();
      });

    this.selectedTab = 'details';
  }

  getEnvironmentDetails() {
    this.loading = true;
    this.domainStatusObj = [];
    this.infraService.getEnvironment(this.envId).subscribe((data: any) => {
      this.envName = data.envName;
      const envData = this.utilService.clone(data);
      if (JSON.stringify(this.envMeta) !== JSON.stringify(data)) {
        this.envMeta = envData;
      }
      this.envData = data;
      this.envData['appData'] = [];
      let index = this.envData.activities.findIndex(x => x.activityName === this.domainActivity)
      if (index > -1) {
        this.domainActivityId = this.envData.activities[index].activityID;
        this.getActivityStatus();
      }

      this.loading = false;
    }, err => {
      this.loading = false;
    });

  }

  loadSteps(activity, activityId) {
    this.envService.getEnvSteps(activity, activityId).subscribe(res => {
      const prop = this.activityObj[activity].prop;
      if (res && res[prop]) {
        const tab = this.activityObj[activity].tab;
        const index = this.tabs.findIndex(x => x.title === tab.title);
        if (index === -1) {
          this.tabs.push(tab);
        }
      }
    }, err => {
    });
  }

  loadActivitiesSteps() {
    Object.keys(this.activityObj).forEach(activity => {
      let index = this.envData.activities.findIndex(x => x.activityName === activity);
      if (index !== -1) {
        const activityId = this.envData.activities[index].activityID;
        this.loadSteps(activity, activityId);
      }
    })

  }

  getActivityStatus() {
    this.loading = true;
    this.infraService.getActivityStatus(this.envId).subscribe((res: any) => {
      this.activityProcessing = res.activityProgressing;
      this.activityDescription = res.description;
      this.loading = false;
      if (!this.activityProcessing) {
        this.loadActivitiesSteps();
        this.loadAppData();
      }
    }, err => {
      this.loading = false;
    });

  }
  postRefresh($event) {
    this.tabComponent = $event.scope;
    this.envRefreshObj = $event.envRefreshObj;
    this.notifService.callNotif()
    this.getActivityStatus();
  }



  goToHomeEnvPage() {
    this.router.navigate(['/home/administration/' + this.pillarId]);
  }

  envRefresh() {
    this.tabComponent.refresh();
    this.displayRefreshModal = false;
    this.disableRefreshButtonFlag = true;
  }


  getTabActivityStatus() {
    if (this.tabComponent) {
      this.loading = true;
      this.tabComponent.callActivityStatus().subscribe(data => {

        this.envRefreshObj['enableActivity'] = data.enableRefresh || data.enableLoadCache;
        this.envRefreshObj['currentStatus'] = data.currentStatus;
        this.envRefreshObj['envDescription'] = data.envDescription;
        this.envRefreshObj['envStatusMsg'] = data.envDescription;
        this.tabComponent.envRefreshObj = this.utilService.clone(this.envRefreshObj);
        if (this.envRefreshObj['enableActivity']) {
          this.getActivityStatus();
          this.tabComponent.loadActivityData();
        }
        this.loading = false;

      }, err => {
        this.loading = false;
      })
    }
  }

  loadAppData() {
    this.infraService.getApplistByActivityID(this.domainActivityId).subscribe((appData: any) => {
      if (appData && appData.PSApps) {
        this.envData['appData'] = appData.PSApps;
        this.loadInstances();
      }
    })
  }

  loadInstances() {
    let observables = [];
    this.envData['appData'].forEach(app => {
      app['disableDomain'] = false;
      this.loadInstance(app);
    });
  }

  loadInstance(app) {
    this.infraService.getServerInstance(app.appID).subscribe(servers => {
      servers['PSHostNames']
      app.servers = servers['PSHostNames'];
      (app.servers || []).forEach(server => {
        server['appId'] = app.appID;
        server['show'] = true;
      });
      this.loadDomains(app.servers);
    });
  }

  loadDomains(servers) {
    (servers || []).forEach(server => {
      this.loadDomain(server);
    });
  }

  loadDomain(server) {
    this.infraService.getDomains(server.hostID).subscribe(data => {
      server['domains'] = data['PSDomains'];
      (server.domains || []).forEach(domain => {
        domain['appId'] = server.appId;
        domain['hostId'] = server.hostID;
      });
      this.loadScripts(server.domains);
    });
  }


  loadScripts(domains) {
    (domains || []).forEach(domain => {
      this.loadScript(domain);
      const referenceId = `${domain.appId}+${domain.hostId}+${domain.domainID}`;
      this.domainStatusObj[referenceId] = domain;
      domain['referenceId'] = referenceId;
      this.getStatus(referenceId);
      this
    });
  }


  loadScript(domain) {
    this.infraService.getScriptsInfo(domain.domainID).subscribe(scripts => {
      domain['actionItems'] = scripts["PSScripts"]
    })

  }


  collapseExpandServers($event) {
    const show = $event.target.checked;
    (this.envData.appData || []).forEach(app => {
      (app.servers || []).forEach(server => {
        server.show = show;
        (server.domains || []).forEach(domain => {
          domain.show = show;
        });
      });
    });
  }

  getStatuses() {
    if (!this.enableRefresh)
      return true;
    this.stopAllTimers();
    const domains = [];
    this.disableServerStatusesLoad = true;
    let observables$ = [];
    const refIds = [];
    Object.keys(this.domainStatusObj).forEach(refId => {
      refIds.push(refId);
      const domain = this.getDomainByReference(refId);
      domain.statusLoaded = false;
      domain.scriptProgressing = false;
      observables$.push(this.infraService.getDomainStatus(this.getDomainStatusPayload(domain, 'Status')));
    });


    forkJoin(observables$).subscribe(results => {
      results.forEach((result, index) => {
        const domain = this.getDomainByReference(refIds[index]);
        const obj = {
          description: result.status,
          status: result.isStopped,
          error: (result.statusCode !== 200) ? true : false,
          scriptProgressing: result.scriptProgressing
        }
        this.setStatusInDomain(domain, obj);
      });
      this.showEnvStatusNotifcatn('', 'Server Status Loaded Successfully');
      this.disableServerStatusesLoad = false;
    })
  }

  updateServerStatuses() {
    Object.keys(this.environmentDetails).forEach(appName => {
      this.environmentDetails[appName].envs.forEach(env => {
        env.domainData.forEach(domain => {
          domain.serverName = env.serverName;
          domain.appName = appName;
          this.setStatusInDomain(domain, this.serverStatusObj[domain.referenceId]);
        });
      });
    });
  }

  getDomainByReference(referenceId) {
    return this.domainStatusObj[referenceId];

  }


  getDomainStatusPayload(domain, actionName) {
    return {
      domainID: domain.domainID,
      actionName,
      appID: domain.appId,
      hostID: domain.hostId
    };
  }


  getStatus(referenceId) {

    const domain = this.getDomainByReference(referenceId);
    domain.statusLoaded = false;
    domain.scriptProgressing = false;
    this.infraService.getDomainStatus(this.getDomainStatusPayload(domain, 'Status')).subscribe((result: any) => {
      let obj = {
        description: result.status,
        status: result.isStopped,
        error: (result.statusCode !== 200) ? true : false,
        scriptProgressing: result.scriptProgressing
      };
      this.setStatusInDomain(domain, obj);
    });
  }


  setStatusInDomain(domain, dataObj) {
    domain.stopped = dataObj.status;
    domain.statusLoaded = true;
    domain.restarted = domain.stopped;
    domain.started = !domain.stopped;
    domain.clearCacheRestart = domain.stopped;
    domain.description = dataObj.description;
    domain.scriptProgressing = dataObj.scriptProgressing;
    domain.error = dataObj.error;
    if (dataObj.scriptProgressing) {
      this.createTimer(domain.referenceId);
    } else {
      this.stopTimer(domain.referenceId);
    }

  }



  createTimer(referenceId) {
    if (!this.domainsInProgress[referenceId]) {
      this.domainsInProgress[referenceId] = {};
    }
    if (!this.domainsInProgress[referenceId]['timer']) {
      this.domainsInProgress[referenceId]['timer'] = setInterval(this.getStatus.bind(this, referenceId), 120000);
    }
  }


  stopTimer(referenceId) {
    if (this.domainsInProgress[referenceId] && this.domainsInProgress[referenceId]['timer']) {
      clearInterval(this.domainsInProgress[referenceId]['timer']);
      delete this.domainsInProgress[referenceId]['timer'];
    }

  }




  stopAllTimers() {
    Object.keys(this.domainsInProgress).forEach(refernecId => {
      this.stopTimer(refernecId);
    });
  }



  goBackToApps(appName) {
    this.router.navigate(['/adminstration/' + appName])
  }


  showEnvStatusNotifcatn(headerMsg, statusMsg, notiifType = 'success') {
    const iconType = {
      'info': 'notifications',
      'success': 'done_outline',
      'warning': 'warning',
      'danger': 'error',
      'rose': '',
      'primary': ''

    }

  }



  enableDomainModal(domain, action) {
    if (this.checkAccess()) {
      this.action = action;
      this, this.selectedDomain = domain;
      this.displayDomainModal = true;
    }
  }

  checkAccess() {
    let access = this.authService.hasGrants();
    if (!access) {
      this.showEnvStatusNotifcatn("Warning", 'You don\'t have access', 'warning');
      this.toastr.warning('You don\'t have access', 'Warning');
    }
    return access;
  }

  enableRefreshModal(envName) {
    if (this.checkAccess()) {
      this.displayRefreshModal = true;
    
    }
  }

  showRefreshModel($event) {
    if (this.checkAccess()) {
      this.tabComponent = $event.scope;
      this.refreshHeader = $event.msgs.refreshHeader;
      this.refreshMsg = $event.msgs.refreshMsg;
      this.displayRefreshModal = true;
      this.passPhrase.reset('');
      this.enableRefreshBtn = false;
    }
  }



  disableRefreshModal() {
    this.displayRefreshModal = false;
  }

  disableDomainModal() {
    this.displayDomainModal = false;
  }

  getAction() {
    let value = '';
    switch (this.action) {
      case 'Start':
        value = 'Start';
        break;
      case 'Stop':
        value = 'Stop';
        break;
      case 'Restart':
        value = 'Restart';
        break;
      case 'Clear Cache Restart':
        value = 'Clear Cache Restart';
        break;
    }
    return value;
  }

  domainActionExecution() {
    if (this.checkAccess()) {
      if (this.action) {
        this.selectedDomain.statusLoaded = false;
        this.doDomainAction(this.selectedDomain);
      }
    }
    this.displayDomainModal = false;
  }

  doDomainAction(selectedDomain) {
    selectedDomain.statusLoaded = false;

    this.infraService.domainAction(this.getDomainStatusPayload(selectedDomain, this.action)).subscribe(
      (result: any) => {
        let correlationId = this.utilService.getCorelationId(this.envName, selectedDomain.appId, selectedDomain.hostID, selectedDomain.domainID);
        this.loggerService.log(correlationId, this.module, this.envName, this.action, this.domainName);
        let obj = {
          description: result.status,
          status: result.isStopped,
          error: (result.statusCode !== 200) ? true : false,
          scriptProgressing: result.scriptProgressing
        };
        let domainObj = this.getDomainByReference(selectedDomain.referenceId);
        this.setStatusInDomain(domainObj, obj);
      }
    );
  }

  parseJson(data) {
    var jsonStr = JSON.stringify(data);
    return JSON.parse(jsonStr);
  }

  openModal(content, size) {
    this.modalService.open(content, { size: size });
  }
  closeModal() {
    console.log("in close modal method");
  }
}