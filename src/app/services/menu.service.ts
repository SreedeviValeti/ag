import { Injectable } from '@angular/core';
import { APIClientService } from './api-client.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class MenuService {


    constructor(private apiClient: APIClientService) { }

    submenuItems(url) {
        return this.apiClient.get(url).pipe(map(res => res));
    }

}