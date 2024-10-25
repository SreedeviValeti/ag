import { InfraService } from './../../../services/infra.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators'
import { Location } from '@angular/common'

@Component({
  selector: 'app-edit-administration',
  templateUrl: './edit-administration.component.html',
  styleUrls: ['./edit-administration.component.scss']
})
export class EditAdministrationComponent implements OnInit {
  envId = ''; appName; envName;
  pillarId = '';
  loading = false;
  showEdit = false;
  envData: any;

  refreshActivity = "refresh";
  loadCache = "LoadCache";

  tabs = [
    { name: 'env', display: 'Domain Info' },
    { name: 'steps', display: 'Refresh Steps' },
    { name: 'loadCache', display: 'Load Cache' }
   /*  { name: 'bounce', display: 'Rolling Bounce' } */
  ];
  selectedTab;

  constructor(private router: Router,
  private location: Location,
    private infraService: InfraService,
    private actvRoute: ActivatedRoute) {
    this.onTabSelect(this.tabs[0]);
  }

  ngOnInit(): void {
    this.actvRoute.params.subscribe(
      params => {
        this.envId = params['envId'];
        this.pillarId = params['pillarId'];
        this.loadEnvironmentData();

      });
  }

  loadEnvironmentData() {
    this.loading = true;
    this.infraService.getEnvironment(this.envId).subscribe(data => {
      this.envData = data;
      console.log(data)
      this.loading = false;
    }, err => {
      this.loading = false;
    })
  }
  onTabSelect(tab) {
    this.selectedTab = tab;
  }

  goToHomeEnvPage() {
   //  this.router.navigate(['/home/administration/' + this.pillarId]);
   this.location.back()
  }


}
