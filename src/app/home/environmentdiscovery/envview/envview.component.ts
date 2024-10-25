import { Component, OnChanges, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common'
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'envview',
    templateUrl: './envview.component.html',
    styleUrls: ['./envview.component.scss']
})

export class EnvviewComponent implements OnInit{
    envronmentList = []
    refreshActivity = "refresh";
    loadCache = "LoadCache";
    envname = ''
    tabs = [
      { name: 'env', display: 'Domain Info' },
      { name: 'psactivities', display: 'Schedule Activities' },
      { name: 'adhocpsactivities', display: 'Adhoc Activities' },
      { name: 'lorgetention', display: 'Log Retention' },
      { name: 'refreshsteps', display: 'Refresh Steps' },
      { name: 'loadcache', display: 'Load Cache' },
      { name: 'pwd', display: 'Password Management' },
      { name: 'buildmanagement', display: 'Build Management' },
      { name: 'exxecutescripts', display: 'Execute Scripts' },
    ];
    selectedTab;
    constructor(
        private location: Location,private actvRoute: ActivatedRoute) {
          this.onTabSelect(this.tabs[0]);
        }
        ngOnInit(): void {
          this.actvRoute.params.subscribe(
            params => {
              this.envname = params['env'];
            });
            this.loadEnv();
        }
        
    onTabSelect(tab) {
        this.selectedTab = tab;
      }

      loadEnv(){
        console.log(this.envname)
        var env = JSON.parse(localStorage.getItem('environments'))
        console.log(env)
        for (var i=0, iLen=env.length; i<iLen; i++) {
          if (env[i].envname == this.envname) {
            console.log(env[i])
            this.envronmentList = env[i]
            }
          }
          localStorage.setItem("envname",this.envronmentList['envname'])
          localStorage.setItem('highvavailable',this.envronmentList['high_availability'])
      }

      goToHomeEnvPage() {
        this.location.back()
       }
}