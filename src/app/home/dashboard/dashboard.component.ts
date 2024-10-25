import { ToastrService } from 'ngx-toastr';
import { InfraService } from './../../services/infra.service';
import { Component, OnInit } from '@angular/core';
import { forkJoin, observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  loading = false;
  hasEditAccess = false;
  editSPolicy = false;
  envLoading
  agdomain = environment.agdomain
  lastrefreshurl = `https://api.${this.agdomain}/refresh/psraid-0d49aa6c`
  selectedTab;
  selectedPillar;
  selectedEnv;
  isDelPopupShow = false;
  newPillarName: string = '';
  createPillarFlag;
  pillarnames = ['HCM', "Campus Solutions"];
  pillarlist = [];
  kibanaURL;
  URL = 'http://hcmpum43.erpademos.com/psc/healthcenter/EMPLOYEE/HRMS/c/PTSF_SEARCH_ADMIN.PTSF_KIBANA_COMP.GBL?DBOARD=URLGEN&DASHBOARD=Health%20Center&'
  envStatusObj = {};
  lastRefreshDate:any

  constructor(
    private infraService: InfraService,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.getpillarlist();
    this.lastRefresh()
  }

  getpillarlist() {
    this.loading = true;
    this.infraService.getpillarlist().subscribe(
      data => {
        this.pillarsFormat(data['pillars']);
      },
      err => {
        console.log("err data is", err);
        this.loading = false;
      });
  }
  lastRefresh(){
    const payload = {
      "account": environment.account,
      "region":environment.region
    }
    this.infraService.getLastRefresh(this.lastrefreshurl,payload).subscribe(
      data => {
        this.lastRefreshDate = data
      },
      err => {
        console.log("err data is", err);
        this.loading = false;
      });
  }

  expandOrcollapse(pillar, $event) {
    if ($event) {
      $event.stopPropagation()
    }
    if (pillar.expand) {
      pillar.expand = false;
    } else {
      pillar.expand = true;
      if (!pillar.dataLoaded) {
        this.loadEnvs(pillar);
      }
    }
  }

  loadEnvs(pillar) {
    pillar.envLoading = true;
    this.infraService.getEnvlistBypillarId(pillar.id)
      .subscribe(
        data => {
          pillar.envLoading = false;
          pillar.environmentsList = data["environments"];
          pillar.envsLoaded = true;
        }
      );
  }

  environmentsRes(res) {
    console.log(res);
  }

  pillarsFormat(pillars) {
    this.pillarlist = pillars;
    console.log(this.pillarlist)
    const observales$ = [];
    (pillars || []).forEach(pillar => {
      observales$.push(this.infraService.getEnvlistBypillarId(pillar.pillarID));
    });

    forkJoin(observales$).subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        let pillar = this.pillarlist[i];
        pillar.envList = data[i].environments;
        (pillar.envList || []).forEach(env => {
          env.processing = '';
          env.activityDescription = '';
          env.statusLoaded = false;
          const referenceId = `${pillar.pillarID}+${env.envName}+${env.envID}`;
          this.envStatusObj[referenceId] = env;
          this.getActivityStatus(referenceId);
        });
      }
      this.loading = false;

    });

  }

  getActivityStatus(referenceId) {
    let environment = this.envStatusObj[referenceId];
    this.loading = true;
    this.infraService.getActivityStatus(environment.envID).subscribe((res: any) => {
      environment.processing = res.activityProgressing;
      environment.activityDescription = res.description;
      environment.statusLoaded = true;
      environment.status = res.activityProgressing ? 'Stopped' : 'Running';

    }, err => {
      this.loading = false;
    });

  }

  envRefresh(env) {
    console.log(env);
  }
  kibanaClick()
  {
    this.kibanaURL = this.URL + "&output=embed";
    window.location.replace(this.kibanaURL);
  }
}
