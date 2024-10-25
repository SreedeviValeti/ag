import { PermissionService } from 'src/app/services/auth/permission.service';
import { AuthenticationService } from './auth/auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class APIClientService {

    constructor(private http: HttpClient,
        private permService: PermissionService,
        private authService: AuthenticationService) {

    }


    get(url): Observable<{}> {
        return this.http.get(url, this.getHeaders())
    }

    delete(url): Observable<{}> {
        return this.http.delete(url, this.getHeaders())
    }

    post(url, params) {
        return this.http.post(url, params, this.getHeaders());
    }

    
    put(url, params) {
        return this.http.put(url, params, this.getHeaders());
    }
    getHeaders() {
        let auth_token = '';
        const currentUser =this.permService.cognitoUser;
        if (currentUser && currentUser.getSignInUserSession()) {
            auth_token = currentUser.getSignInUserSession().getAccessToken().getJwtToken();

        }
       
        const httpOptions = {
            headers: new HttpHeaders(
                { 'Authorization': `Bearer ${auth_token}`,   
                'x-api-key': environment.apikey,
                'authorizationToken':environment.authToken,
                'account':environment.account,
                'region':environment.region
            })
        };
        return httpOptions;

    }

    private handleError(errorResponse: Response) {
        return Observable.throw(errorResponse.json() || "Server error");
    }
}