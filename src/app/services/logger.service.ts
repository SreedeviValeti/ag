import { environment } from 'src/environments/environment.prod';
import { APIClientService } from './api-client.service';
import { AuthenticationService } from './auth/auth.service';
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})
export class LoggerService {
    agdomain = environment.agdomain
    logUrl = `https://api.${this.agdomain}/dynamodb`
    mainwindowUpdateUrl = `https://api.${this.agdomain}/ssm`
    constructor(private restService: APIClientService,
        private authService: AuthenticationService) { }

    log(uniqueId, module, env, action, domain, data?) {
        let userName = this.authService.getUser();
        let date = new Date().toISOString();
        const payload = {
            "operation": "create",
            "payload": {
                "Item": {
                    "env": env,
                    "dttm": date,
                    "uid": uniqueId,
                    "uname": userName,
                    "module": module,
                    "domain": domain,
                    "action": action
                }
            }
        }
        if(data){
            payload["payload"]["Item"]['data'] = data;
        }
        this.restService.post(this.logUrl,payload).subscribe(data=>{
            console.log(data);
        })
    }
    updateMainWin(envNameValue,startDateTime,endDateTime,cronExp,){
        const updateMainWind={
                "StartDate":startDateTime,
                "EndDate":endDateTime,
                "Schedule":cronExp,
                }             
        let finalposturl=this.mainwindowUpdateUrl+'?envName='+envNameValue;
        //console.log("finalposturl value is :",finalposturl);
        this.restService.post(finalposturl,updateMainWind).subscribe(data=>{
            console.log(data);
        })  
    }    
}