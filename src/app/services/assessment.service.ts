import { Injectable } from '@angular/core';
import { APIClientService } from './api-client.service';
import { environment } from 'src/environments/environment.prod';
@Injectable({
    providedIn: 'root'
})
export class AssessmentService {
    // agdomain = environment.agdomain
    agdomain = environment.agdomain
    restapiid = environment.restapiid
    region = environment.region
    envurl = `https://${environment.apigw_domain}/peoplesoft/environment-discovery`    
    constructor(private apiClient: APIClientService) { }

    getApps() {
        
        const url = './assets/assessment.json';
        console.log("url in applist method is:", url);
        return this.apiClient.get(url);
    }
    getEnv(body) { 
        const url = this.envurl;
        console.log("url in applist method is:", url);
        return this.apiClient.post(url, body)

}
}


