import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { APIClientService } from './api-client.service';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class InfraService {


    infraUrl = '';
    infraDetailUrl = '';
    envRefreshUrl = '';

    startDomainUrl = '';
    stopDomainUrl = '';
    restartDomainUrl = '';
    clearcacherestartDomainUrl = '';
    domainStatusCheckUrl = 'S';
    mainwindow = '';
    baseUrl = localStorage.getItem('migrationbaseurl')
    pillarlist = `${this.baseUrl}/pillars`;
    envUrl = `${this.baseUrl}/environments`;
    appUrl = `${this.baseUrl}/applications`;
    hostUrl = `${this.baseUrl}/hostnames`;
    domainUrl = `${this.baseUrl}/domains`;
    scriptsUrl = `${this.baseUrl}/scripts`;
    domainStatus = `${this.baseUrl}/status`;
    domainActionUrl = `${this.baseUrl}/psactions`;
    activityStatusUrl = `${this.baseUrl}/psactivitystatus`;
    envRefreshStatusUrl = `${this.baseUrl}/refresh`;
    aloadCacheStatusUrl = `${this.baseUrl}/LoadCache`;
    metricsUrl = `${this.baseUrl}/metrics`;



    constructor(private apiClient: APIClientService) { }

    getpillarlist() {
        const payload = {
            "account": environment.account,
            "region":environment.region
          }
        let url = `${this.pillarlist}`;
        console.log("url in getpillarlist method is:", url);
        return this.apiClient.post(url,payload);
    }
    getenvdiscoverypillarlist(url,payload) {
        console.log("url in getpillarlist method is:", url);
        return this.apiClient.post(url,payload);
    }
    getLastRefresh(url,payload){
        return this.apiClient.post(url,payload);
    }
    fileUpload(url,payload){
        return this.apiClient.put(url,payload);
    }
    createPillar(pillarname) {
        let url = `${this.pillarlist}`;
        const body = {
            "pillarName": pillarname
        };
        return this.apiClient.post(url, body).pipe(
            map(res => res)
        );
    }

    getMainWindow(env) {
        let url = `${this.mainwindow}?envName=${env}`;
        return this.apiClient.get(url);
    }

    getInfraMetrics(pillarID) {
        let url = `${this.metricsUrl}?pillarID=${pillarID}`;
        return this.apiClient.get(url);
    }



    getInfraData(appName) {
        let url = `${this.infraUrl}?appName=${appName}`;
        return this.apiClient.get(url).pipe(
            map(res => res)
        )
    }

    refreshEnv(envName) {
        let url = `${this.envRefreshUrl}?envname=${envName}`;
        return this.apiClient.get(url).pipe(
            map(res => res)
        )
    }

    getEnvRefreshStatus(refreshId) {
        let url = `${this.envRefreshStatusUrl}/${refreshId}`;
        return this.apiClient.get(url).pipe(
            map(res => res)
        )
    }
    getLoadCacheStatus(refreshId) {
        let url = `${this.aloadCacheStatusUrl}/${refreshId}`;
        return this.apiClient.get(url).pipe(
            map(res => res)
        )
    }
    getInfraDetail(envName) {
        let url = `${this.infraDetailUrl}?envName=${envName}`;
        return this.apiClient.get(url).pipe(
            map(res => res)
        )
    }
    getDomainStatus(body) {
        console.log(body);
        let url = `${this.domainStatus}`;
        return this.apiClient.post(url, body).pipe(
            map(res => res)
        )
    }

    domainAction(payload) {
        const url = `${this.domainActionUrl}`;
        return this.apiClient.post(url, payload).pipe(
            map(res => res)
        )
    }


    createEnv(body) {

        const url = `${this.envUrl}`;
        return this.apiClient.post(url, body).pipe(map(res => res));
    }

    editEnv(body) {

        const url = `${this.envUrl}`;
        return this.apiClient.put(url, body).pipe(map(res => res));
    }

    deleteEnvironment(envID, pillarId) {
        const url = `${this.envUrl}?envID=${envID}&pillarID=${pillarId}`;
        return this.apiClient.delete(url).pipe(map(res => res));

    }


    getEnvironment(envId) {
        const url = `${this.envUrl}/${envId}`;
        return this.apiClient.get(url).pipe(map(res => res));
    }

    refreshEnvironment(body) {
        return this.apiClient.post(this.envRefreshStatusUrl, body).pipe(map(res => res));
    }
    refreshLoadCache(body) {
        return this.apiClient.post(this.aloadCacheStatusUrl, body).pipe(map(res => res));
    }


    getEnvlistBypillarId(envName) {
        const url = `${this.envUrl}?pillarID=${envName}`;
        return this.apiClient.get(url).pipe(map(res => res));
    }


    updateScripts(body) {
        const url = `${this.scriptsUrl}`;
        console.log(url);
        console.log(body);
        return this.apiClient.put(url, body).pipe(map(res => res));
    }
    updateDomain(body) {
        const url = `${this.domainUrl}`;
        console.log(url);
        console.log(body);
        return this.apiClient.put(url, body).pipe(map(res => res));
    }

    updateServer(body) {
        const url = `${this.hostUrl}`;
        console.log(url);
        console.log(body);
        return this.apiClient.put(url, body).pipe(map(res => res));
    }

    updateApp(body) {
        const url = `${this.appUrl}`;
        console.log(url);
        console.log(body);
        return this.apiClient.put(url, body).pipe(map(res => res));
    }



    deleteApp(appID, psadID) {

        const url = `${this.appUrl}?appID=${appID}&psadID=${psadID}`;
        console.log(url);
        return this.apiClient.delete(url).pipe(map(res => res));
    }

    deleteServer(appID, hostID) {

        const url = `${this.hostUrl}?appID=${appID}&hostID=${hostID}`;
        console.log(url);
        return this.apiClient.delete(url).pipe(map(res => res));
    }

    deleteDomain(domainID, hostID) {

        const url = `${this.domainUrl}?domainID=${domainID}&hostID=${hostID}`;
        console.log(url);
        return this.apiClient.delete(url).pipe(map(res => res));
    }

    deleteActionItem(domainID, actionItemName) {

        const url = `${this.scriptsUrl}?domainID=${domainID}&actionName=${actionItemName}`;
        console.log(url);
        return this.apiClient.delete(url).pipe(map(res => res));
    }

    getApplistByActivityID(activityid) {
        const url = `${this.appUrl}?activityID=${activityid}`;
        return this.apiClient.get(url).pipe(map(res => res));
    }
    createApplication(body) {
        const url = `${this.appUrl}`;
        return this.apiClient.post(url, body).pipe(map(res => res));
    }


    createServerInstance(body) {
        const url = `${this.hostUrl}`;
        return this.apiClient.post(url, body).pipe(map(res => res));
    }

    getServerInstance(appId) {
        const url = `${this.hostUrl}?appID=${appId}`;
        return this.apiClient.get(url).pipe(map(res => res));
    }

    createDomain(body) {
        const url = `${this.domainUrl}`;
        return this.apiClient.post(url, body).pipe(map(res => res));
    }

    getDomains(serverId) {
        const url = `${this.domainUrl}?hostID=${serverId}`;
        return this.apiClient.get(url).pipe(map(res => res));
    }
    createScripts(body) {
        const url = `${this.scriptsUrl}`;
        return this.apiClient.post(url, body).pipe(map(res => res));

    }
    getScriptsInfo(domainId) {
        const url = `${this.scriptsUrl}?domainID=${domainId}`;
        return this.apiClient.get(url).pipe(map(res => res));
    }

    getActivityStatus(envId): Observable<any> {
           const url = `${this.activityStatusUrl}?envID=${envId}`;
           return this.apiClient.get(url).pipe(map(res => res));
        /* return of({
            activityProcessing: false,
            activityDescription: ''
        }) */

    }
    logsmanagement(body,url){
        return this.apiClient.post(url,body)


    }
}


