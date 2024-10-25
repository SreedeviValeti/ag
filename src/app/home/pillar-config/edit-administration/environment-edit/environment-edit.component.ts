import { UtilService } from './../../../../services/util.service';
import { EnvDeleteComponentModelType } from './env-delete-type-model/env-delete-type-model.component';
import { InfraService } from './../../../../services/infra.service';
import { ScriptModelComponent } from './script-model/script-model.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { EditEnvModelComponent } from '../../setup/edit-env-model/edit-env-model.component';

const APP = 'app';
const SERVER = 'server';
const DOMAIN = 'domain';
const SCRIPT = 'script';

@Component({
  selector: 'environment-edit',
  templateUrl: './environment-edit.component.html',
  styleUrls: ['./environment-edit.component.scss']
})
export class EnvironmentEditComponent implements OnChanges {
  @Input()
  envData;

  @Output()
  triggerEnvLoad = new EventEmitter<boolean>();

  loading = false;

  newAppName: string;
  hostName: string;
  domainName: string;
  instanceID: string;
  deletedType;

  selectedTypeObj;
  parentObj;
  message: ''
  showActionPopup;

  activityId: string;
  activityName = "psDomainActions"
  appList = [];




  constructor(private infraService: InfraService,
    private utilService: UtilService,
    private modalService: NgbModal,
    private toastr: ToastrService, private actvRoute: ActivatedRoute
  ) { }

  ngOnChanges() {
    if (this.envData) {
      this.envData['appData'] = [];
      const index = this.envData.activities.findIndex(x => x.activityName === this.activityName)
      if (index > -1) {
        this.activityId = this.envData.activities[index].activityID;
        this.loadAppData();
      }

    }
  }

  showDeleteAppPopup(parentObj, selectedTypeObj) {
    this.selectedTypeObj = selectedTypeObj;
    this.parentObj = parentObj;
    const scope = this;
    const modalRef = this.modalService.open(EnvDeleteComponentModelType, {
      size: 'md',
    });
    modalRef.componentInstance.envData = this.envData;
    modalRef.componentInstance.selectedTypeObj = selectedTypeObj;
    modalRef.componentInstance.parentObj = parentObj;
    modalRef.componentInstance.activityId = this.activityId;

    modalRef.result.then((result) => {
      switch (this.selectedTypeObj.deletedType) {
        case APP:
          this.loadAppData();

          break;
        case SERVER:
          this.loadInstance(this.parentObj);

          break;
        case DOMAIN:
          this.loadDomain(this.parentObj);

          break;
        case SCRIPT:
          this.loadScript(this.parentObj);
          break;
      }

    }, reason => {
      console.log(reason);
    });
  }




  loadAppData() {
    this.infraService.getApplistByActivityID(this.activityId).subscribe((appData: any) => {
      if (appData && appData.PSApps) {
        this.envData['appData'] = appData.PSApps;
        console.log(this.envData['appData'])
        this.loadInstances();
      }
    })
  }

  loadInstances() {
    let observables = [];
    this.envData['appData'].forEach(app => {
      app.loading = true;
      app.appNameNew = this.utilService.clone(app.appName);
      app.edit = false;
      app.deletedType = APP;
      app.targetAccount = '';
      this.loadInstance(app);
    });
  }

  loadDomains(servers) {
    (servers || []).forEach(server => {
      server.loading = true;
      server.deletedType = SERVER;
      server.hostNameNew = this.utilService.clone(server.hostName);
      server.instanceIDNew = this.utilService.clone(server.instanceID);
      this.loadDomain(server);
    });
  }

  loadDomain(server) {
    this.infraService.getDomains(server.hostID).subscribe(data => {
      server.loading = false;
      server['domains'] = data['PSDomains'];
      this.loadScripts(server.domains)

      console.log("domains inside the server are :", server.domains);
    });
  }

  loadScripts(domains) {
    (domains || []).forEach(domain => {
      domain.deletedType = DOMAIN;
      domain.loading = true;
      domain.domainNameNew = this.utilService.clone(domain.domainName);
      this.loadScript(domain);
    });
  }
  loadScript(domain) {
    this.infraService.getScriptsInfo(domain.domainID).subscribe(data => {
      domain.loading = false;
      domain['actionItems'] = data["PSScripts"];
      (data["PSScripts"] || []).forEach(script => {
        script.deletedType = SCRIPT;
      });
    })

  }

  loadInstance(app) {
    this.infraService.getServerInstance(app.appID).subscribe(servers => {
      app.loading = false;
      servers['PSHostNames']
      app.servers = servers['PSHostNames'];
      this.loadDomains(app.servers);
    });
  }

  resetHosts() {
    this.hostName = '';
    this.instanceID = '';
  }

  createInstance(app) {
    if (this.hostName && this.instanceID) {
      app.loading = true;
      const body = {
        appID: app.appID,
        hostName: this.hostName,
        instanceID: this.instanceID
      }
      this.infraService.createServerInstance(body).subscribe(data => {
        this.loadInstance(app);
        app.loading = false;
        this.resetHosts();
        this.toastr.success(`${this.hostName} created successfully`);
      }, err => {
        app.loading = false;
        this.resetHosts();
      })
    } else {
      this.toastr.warning('Please enter required fields');
    }

  }

  addDomain(server) {
    if (this.domainName) {
      server.loading = true;
      const body = {
        hostID: server.hostID,
        domainName: this.domainName
      }
      this.infraService.createDomain(body).subscribe(data => {
        this.loadDomain(server);
        server.loading = false;
        this.domainName = '';
        this.toastr.success(`${this.domainName} created successfully`);
      }, err => {
        server.loading = false;
      })
    } else {
      this.toastr.warning('Please enter required fields');
    }
  }


  addapplication() {
    this.loading = true;
    const body = {
      envID: this.envData.envID,
      activityName: this.activityName,
      appName: this.newAppName
    }

    this.infraService.createApplication(body).subscribe(
      response => {
        this.toastr.success("Application Added Successfully");
        this.loading = false;
        this.newAppName = '';
        if (this.activityId) {
          this.loadAppData();
        } else {
          this.triggerEnvLoad.next(true);
        }
        this.newAppName = '';
      }, err => {
        this.loading = false;
      });


  }
  openCreateOrUpdateScriptModel(domain, actionItem) {
    const scope = this;
    const modalRef = this.modalService.open(ScriptModelComponent, {
      size: 'md',
    });

    modalRef.componentInstance.domainObj = domain;
      modalRef.componentInstance.domainId = domain.domainID;
    modalRef.componentInstance.actionItem = actionItem;
    modalRef.result.then((result) => {
      this.loadScript(domain);
    }, reason => {
      console.log(reason);
    });
  }

  toggleApp(app) {
    app.toggleApp = !app.toggleApp;
    app.edit = false;
  }
  toggleServer(server) {
    server.toggleServer = !server.toggleServer;
    server.edit = false;
  }

  toggleDomain(domain) {
    domain.toggleDomain = !domain.toggleDomain;
    domain.edit = false;
  }

  updateActionItem(domain, actionItem) {
    console.log(domain);
    console.log(actionItem);
  }

  updateDomain(server, domain) {
    domain.loading = true;
    const body = {
      hostID: server.hostID,
      domainID: domain.domainID,
      domainName: domain.domainNameNew
    }
    this.infraService.updateDomain(body).subscribe((appData: any) => {
      this.toastr.success('Domain successfully updated');
      this.loadDomain(server);
      domain.loading = false;
    }, err => {
      domain.loading = false;
      this.toastr.error('error in updating domain details');
    })
  }


  updateServer(app, server) {
    server.loading = true;
    const body = {
      appID: app.appID,
      hostID: server.hostID,
      hostName: server.hostNameNew,
      instanceID: server.instanceIDNew,
      targetAccount: server.targetAccountNew
    }
    this.infraService.updateServer(body).subscribe((appData: any) => {
      server.loading = false;
      this.toastr.success('Instance successfully updated');
      this.loadInstance(app);
    }, err => {
      server.loading = false;
      this.toastr.error('error in updating server details');
    })
  }



  updateApp(app) {
    app.loading = true;
    const body = {
      activityID: this.activityId,
      appID: app.appID,
      appName: app.appNameNew
    }
    this.infraService.updateApp(body).subscribe((appData: any) => {
      app.loading = false;
      app.edit = false;
      this.loadAppData();
    }, err => {
      app.loading = false;
      this.toastr.error('error in updating app details');
    })

  }

}