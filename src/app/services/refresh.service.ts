import { environment } from '../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { APIClientService } from './api-client.service';
@Injectable({
    providedIn: 'root'
})
export class RefreshService {

    baseUrl = localStorage.getItem('migrationbaseurl')

    refreshUrl =  `${this.baseUrl}/schedule`;

    constructor(private apiClient: APIClientService) { }

    getScheduleInfo(envName, refreshId){
        let url = `${this.refreshUrl}?id=${refreshId}&envName=${envName}`;
        return this.apiClient.get(url);
    }
  
    createSchedule(payload, create: boolean){
        if(create){
            return this.apiClient.post(this.refreshUrl, payload);
        }else{
            return this.apiClient.put(this.refreshUrl, payload);
        }
      
    }

    // this for databse info API

    databaseInfo(dburl,payload){
        return this.apiClient.post(dburl, payload);
    }
    amiInfo(dburl,payload) {
        
        return this.apiClient.post(dburl,payload);
    }
    // Peoplesoft AMO Info
    createPSAMI(dburl,payload){
        return this.apiClient.post(dburl, payload);
    }
    // Download Oracle Patch
    downloadOraclePatches(dburl,payload){
        return this.apiClient.post(dburl, payload);
    }
    // Install Application Home
    installAppHome(dburl,payload){
        return this.apiClient.post(dburl, payload);
    }
    // Install PS Home
    installPSHome(dburl,payload){
        return this.apiClient.post(dburl, payload);
        }
    // App Build
    appBuild(dburl,payload){
        return this.apiClient.post(dburl, payload);
        }
    // Env Clone
    envClones(dburl,payload){
        return this.apiClient.post(dburl, payload);
        }
    snapShot(dburl,payload){
        return this.apiClient.post(dburl, payload);
    }
    serviceNow(url,payload){
        return this.apiClient.post(url,payload);

    }
    psInventory(url,payload){
        return this.apiClient.post(url,payload);

    }
    envbuild(url){
        return this.apiClient.get(url);

    }
    // App Build
    pwdManager(dburl,payload){
        return this.apiClient.post(dburl, payload);
        }

    logsmanagement(body,url){
        return this.apiClient.post(url,body)
    }
    
    invUsers(body,url){
        return this.apiClient.post(url,body)
    }
    getStatusBoard(dburl,payload) {
        
        return this.apiClient.post(dburl,payload);
    }

  
}


