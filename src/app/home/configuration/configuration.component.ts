import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  constructor() { }

  ngOnInit() {}
  
  envlist: any =['dev','test','prod'];
  logfileWindow=false;
  backUpConfigWindow=false;
  refreshConfigWindow=false;
  enableuptimeSchedulel=false;
  enableBackupPolicyWindow=false;
  enableRefreshPolicyWindow=false;
  recycleNowWindow=false;
  backUpNowWindow=false;
  refreshNowWindow=false;
  //allenv=['CSDMO','CSDEV','CSTST','CSPRD'];
  //allenv=[{"env":"CSDMO"},{"env":"CSDEV"},{"env":"CSSUP"},{"env":"CSTST"},{"env":"CSPRD"}]
  data = {"environments":[
               {
                  "name":"CSDemo",
                  "current_status":"1",
                  "uptime_schedule":"Working Hours",
                  "backup_policy":"Weekly",
                  "last_backup":"12/05/2018",
                  "refresh_policy":"Weekly",
                  "last_refresh":"11/13/2018",
                  "next_maintenance":"12/21/2018",
                  "health":"",
                  "app_name":"Campus Solutions",
                  "cluster_name":""
               },
               {
                  "name":"CSDev",
                  "current_status":"1",
                  "uptime_schedule":"Week Days",
                  "backup_policy_schedule":"Bi-Weekly",
                  "last_backup":"07/13/2018",
                  "refresh_policy":"Nightly",
                  "last_refresh":"07/13/2018",
                  "next_maintenance":"12/21/2018",
                  "health":"",
                  "app_name":"Campus Solutions",
                  "cluster_name":""
               },
               {
                  "name":"CSTest",
                  "current_status":"1",
                  "uptime_schedule":"Working Hours",
                  "backup_policy_schedule":"Bi-Weekly",
                  "last_backup":"12/03/2018",
                  "refresh_policy":"Weekly",
                  "last_refresh":"12/05/2018",
                  "next_maintenance":"12/28/2018",
                  "health":"",
                  "app_name":"Campus Solutions",
                  "cluster_name":""
               },
               {
                  "name":"CSProduction",
                  "current_status":"1",
                  "uptime_schedule":"Always",
                  "backup_policy_schedule":"Nightly",
                  "last_backup":"12/12/2018",
                  "refresh_policy":"NA",
                  "last_refresh":"NA",
                  "next_maintenance":"12/25/2018",
                  "health":"",
                  "app_name":"Campus Solutions",
                  "cluster_name":""
               },
               {
                  "name":"HCMDemo",
                  "current_status":"1",
                  "uptime_schedule":"Working Hours",
                  "backup_policy":"Weekly",
                  "last_backup":"12/05/2018",
                  "refresh_policy":"Weekly",
                  "last_refresh":"11/13/2018",
                  "next_maintenance":"12/21/2018",
                  "health":"",
                  "app_name":"Campus Solutions",
                  "cluster_name":""
               },
               {
                  "name":"HCMDev",
                  "current_status":"1",
                  "uptime_schedule":"Week Days",
                  "backup_policy_schedule":"Bi-Weekly",
                  "last_backup":"07/13/2018",
                  "refresh_policy":"Nightly",
                  "last_refresh":"07/13/2018",
                  "next_maintenance":"12/21/2018",
                  "health":"",
                  "app_name":"Campus Solutions",
                  "cluster_name":""
               },
               {
                  "name":"HCMest",
                  "current_status":"1",
                  "uptime_schedule":"Working Hours",
                  "backup_policy_schedule":"Bi-Weekly",
                  "last_backup":"12/03/2018",
                  "refresh_policy":"Weekly",
                  "last_refresh":"12/05/2018",
                  "next_maintenance":"12/28/2018",
                  "health":"",
                  "app_name":"Campus Solutions",
                  "cluster_name":""
               },
               {
                  "name":"HCMProduction",
                  "current_status":"1",
                  "uptime_schedule":"Always",
                  "backup_policy_schedule":"Nightly",
                  "last_backup":"12/12/2018",
                  "refresh_policy":"NA",
                  "last_refresh":"NA",
                  "next_maintenance":"12/25/2018",
                  "health":"",
                  "app_name":"Campus Solutions",
                  "cluster_name":""
               }
            ]};

  
  enablelogWindowmodal(){
    this.logfileWindow=true;
  }
  enableBackUpConfigWindow(){
    this.backUpConfigWindow=true;
  }
  enableRefreshConfigWindow(){
    this.refreshConfigWindow=true;
  }
  uptimeScheduleUpdate(){
    // window.alert("Clciked uptimeScheduleUpdate button");
    this.enableuptimeSchedulel=true;
  }
  backUpPolicyUpdate(){
     //window.alert("Clciked backUpPolicyUpdate button");
     this.enableBackupPolicyWindow=true;
  }
  refreshPolicyUpdate(){
     //window.alert("Clciked refreshPolicyUpdate button");
     this.enableRefreshPolicyWindow=true;
  }
  enablerecycleNowWindow(){
    this.recycleNowWindow=true;
  }
  enablebackUpNowWindow(){
    this.backUpNowWindow=true;
  }
  enablerefreshNowWindow(){
    this.refreshNowWindow=true;
  }
  disableLogFile(){
    this.logfileWindow=false;
  }
  disableBackUpConfigWindow(){
    this.backUpConfigWindow=false;
  }
  disableRefreshConfigWindow(){
    this.refreshConfigWindow=false;
  }
  disableuptimeSchedule(){
     this.enableuptimeSchedulel=false;
  }
  disableBackupPolicy(){
    this.enableBackupPolicyWindow=false;
  }
  disableRefreshPolicy(){
    this.enableRefreshPolicyWindow=false;
  }
  disablerecycleNowWindow(){
    this.recycleNowWindow=false;
  }
  disablebackUpNowWindow(){
    this.backUpNowWindow=false;
  }
  disablerefreshNowWindow(){
    this.refreshNowWindow=false;
  }
  domainActionExecution(){
    console.log("in domain execution function in ts file");
  }
}
