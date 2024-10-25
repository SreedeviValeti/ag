import { Injectable } from '@angular/core';
import { APIClientService } from './api-client.service';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs-compat';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  loadCacheActivity = 'LoadCache';
  refreshActivity = 'refresh';
  agdomain = environment.agdomain
  stepsurl = `https://api.${this.agdomain}/refreshsteps`
  instanceValidationUrl = `https://api.${this.agdomain}/instancestatus?instanceID=`
  stepsUrl = this.stepsurl;
  hostApi =  `https://api.${this.agdomain}`;
  refreshStepsAPi = `${this.hostApi}/Dev/refreshsteps`;
  loadCacheStepsAPi = `${this.hostApi}/Dev/LoadCachesteps`;

  constructor(private apiClient: APIClientService) { }

  getEnvSteps(activityType, activityId): any {
    const payload = {
      "account": environment.account,
      "region":environment.region
    }
    let url = '';
    switch (activityType) {
      case this.refreshActivity:
        url = `${this.refreshStepsAPi}?refreshID=${activityId}`;;
        break;
      case this.loadCacheActivity:
        url = `${this.loadCacheStepsAPi}?loadCacheID=${activityId}`;;
        break;

    }
    return this.apiClient.post(url,payload).pipe(
      map(res => res)
    )
  }


  saveSteps(activityType, body) {
    let url = '';
    switch (activityType) {
      case this.refreshActivity:
        url = `${this.refreshStepsAPi}`;;
        break;
      case this.loadCacheActivity:
        url = `${this.loadCacheStepsAPi}`;;
        break;

    }
    return this.apiClient.post(url, body).pipe(
      map(res => res)
    )
  }

  validateInstance(instanceId) {
    let url = `${this.instanceValidationUrl}${instanceId}`;
    return this.apiClient.get(url).pipe(
      map(res => res)
    )
  }
  envmangementrefresh(url,payload){
    return this.apiClient.post(url,payload).pipe(
      map(res => res)
    )

  }
  fileUpload(fileToUpload: File) {
    const endpoint = 'https://api.erpasandbox.com/peoplesoft/refreshsteps';
    const formData: FormData = new FormData();

    formData.append('uploaded-file', fileToUpload, fileToUpload.name);
    
    return this.apiClient
      .post(endpoint, formData,)
      .pipe(
        map(res => res)
      )}



} 