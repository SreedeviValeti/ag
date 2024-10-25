import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'environmentdetails',
    templateUrl: './environmentdetails.component.html',
    styleUrls: ['./environmentdetails.component.scss']
})
export class EnvironmentdetailsComponent implements OnInit {
    @Input()
    envronmentList;
    loading = false;
    @Output()
    triggerEnvLoad = new EventEmitter<boolean>();
    activityName = "psDomainActions"
    activityId: string;
    envronmentLists= {'expand':false}
    env
    objectKeys = Object.keys;

    ngOnInit(){
        this.env = [];
            this.env.push(
                {
                    expand: false,
                    IB:Object.assign(this.envronmentList.IB),
                    app:Object.assign(this.envronmentList.app),
                    database:Object.assign(this.envronmentList.database),
                    prcs:Object.assign(this.envronmentList.prcs),
                    web:Object.assign(this.envronmentList.web),
                }
            )
    }

    expandOrcollapse(pillar, $event) {
 
      if (pillar.expand) {
          pillar.expand = false;
      } else {
          pillar.expand = true;
          if (!pillar.dataLoaded) {            
              // this.loadEnvs(pillar);
          }          
      }
  }

  toggleApp(detail) {
    detail.toggleApp = !detail.toggleApp;

  }

  toggleServer(app){
    app.toggleServer = !app.toggleServer
  }

  toggleIB(app) {
    app.toggleIB = !app.toggleIB;
  }

  IBServer(app){
    app.IBServer = !app.IBServer
  }

  togglePRCS(app){
    app.togglePRCS = !app.togglePRCS
  }

  PRCSServer(app){
    app.PRCSServer = !app.PRCSServer
  }

  toggleweb(app){
    app.toggleweb = !app.toggleweb
  }

  webServer(app){
    app.webServer = !app.webServer
  }

  toggleapp(app){
    app.toggleapp = !app.toggleapp
  }

  appServer(app){
    app.appServer = !app.appServer
  } 
}
