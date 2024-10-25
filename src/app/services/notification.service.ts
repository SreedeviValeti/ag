import { Injectable } from '@angular/core';
import { APIClientService } from './api-client.service';
import { map } from 'rxjs/operators';
import { of, Subject, Observable } from 'rxjs';
import { BooleanAttributeValue } from 'aws-sdk/clients/clouddirectory';
import { environment } from 'src/environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    agdomain = environment.agdomain

    notifUrl = `https://api.${this.agdomain}/notifications`

    constructor(private apiClient: APIClientService) { }

    private notifSubject = new Subject<BooleanAttributeValue>();
    private pillarCreateNotif = new Subject<BooleanAttributeValue>();

    callNotif() {
        this.notifSubject.next(true);
    }

    callPillarCreateNotif(){
        this.pillarCreateNotif.next(true);
    }

 

    getPillarCreateNotif(): Observable<any> {
        return this.pillarCreateNotif.asObservable();
    }

    clearMessages() {
        this.notifSubject.next();
    }

    getNotif(): Observable<any> {
        return this.notifSubject.asObservable();
    }

    getNotifications() {
        return this.apiClient.get(this.notifUrl).pipe(
            map(res => res)
        )
    }

    approveOrDecline(url) {
        return this.apiClient.get(url).pipe(
            map(res => res)
        )
    }
    deploymentData(url){
        return this.apiClient.get(url).pipe(
            map(res => res)
        )
        
    }





} 