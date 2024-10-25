import { PermissionService } from './../../../services/auth/permission.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from './../../../services/auth/auth.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { InfraService } from './../../../services/infra.service';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-administration-list',
  templateUrl: './administration-list.component.html',
  styleUrls: ['./administration-list.component.scss']
})
export class AdministrationListComponent implements OnInit {

  ordering = {
    sup: 1,
    tst: 2,
    dev: 3,
    prd: 4,
    dmo: 5
  };


  backupTitle = '';
  refreshHeading = '';
  showDetailPage = false;
  loading = false;
  selectedEnvName: string;
  appName: String;
  token: String;
  email: String;
  environmentsList = [];
  prefix = '';
  infraCardVersions = {
    peopleTools: 'x.x.x',
    application: 'x.x',
    imageUpdate: 'x'
  }
  newEnvName: string = '';
  envApplication;
  envPtools;
  envImage;
  pillarId: any;

  hasEditAccess = false;

  constructor(private infraService: InfraService,
    private authService: AuthenticationService,
    private permService: PermissionService,
    private toastr: ToastrService,
    private actvRoute: ActivatedRoute, private router: Router) { }

  async ngOnInit(): Promise<any> {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.hasEditAccess = this.authService.isERPAAdmin();
    if (currentUser !== null) {
      this.token = currentUser.id_token;
      this.email = currentUser.userdetails.email;
    }
    this.actvRoute.params.subscribe(
      params => {
        this.pillarId = params["pillarId"];
        this.environmentsList = [];
        this.loadEnvironments();
      });

  }
  sortEnvironments(environments) {
    environments.sort((env1, env2) => {
      let env1Suffix = env1['envName'].substring(env1['envName'].length -3);
      let env2Suffix = env2['envName'].substring(env1['envName'].length -3);
      if(env1Suffix){
        env1Suffix = env1Suffix.toLowerCase();
      }
      if(env2Suffix){
        env2Suffix = env2Suffix.toLowerCase();
      }
      return  env1['envName'].localeCompare(env2['envName']);

    });
    this.environmentsList = environments;

  }
  loadEnvironments() {
    this.loading = true;
    this.infraService.getEnvlistBypillarId(this.pillarId)
      .subscribe(
        data => {
          this.loading = false;
          console.log("envlist get api data for particular pillarid:", this.pillarId, data);
          console.log("envlist data only in the previous ", data["environments"]);
          this.sortEnvironments(data["environments"]);
        },
        err => {
          this.loading = false
        }
      );
  }





}
