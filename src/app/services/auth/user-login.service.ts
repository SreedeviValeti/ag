import { Injectable } from '@angular/core';

 import { CognitoCallback, CognitoUtil } from "./cognito.service";
import { CognitoUser } from "amazon-cognito-identity-js";
import { domain } from "../../shared/constants/adminstration-constants";
import { environment } from "src/environments/environment.prod";

@Injectable({
    providedIn:'root'
})
export class UserLoginService {
    userData

    constructor(public cognitoUtil: CognitoUtil) {
    }

    forgotPassword(username: string, callback: CognitoCallback) {

        var saasdomain = username.split('@')[1]
        if('erpa.com' === saasdomain){
            this.userData = {
                Username: username,
                Pool: this.cognitoUtil.getUserPool()
            };

        }
        else if(environment.emaildomainsaasclient === saasdomain){
             this.userData = {
                Username: username,
                Pool: this.cognitoUtil.getSaaSUserPool()

            };
        }
        else{
            
            return `user email should be a valid user in erpa.com or ${environment.emaildomainsaasclient}`

        }

        let cognitoUser = new CognitoUser(this.userData);

        cognitoUser.forgotPassword({
            onSuccess: function() {

            },
            onFailure: function(err) {
                callback.pwdCognitoCallback(err.message, null);
            },
            inputVerificationCode() {
                callback.pwdCognitoCallback(null, null);
            }
        });
    }

    confirmNewPassword(email: string, verificationCode: string, password: string, callback: CognitoCallback) {
        
        var saasdomain = email.split('@')[1]
        if('erpa.com' === saasdomain){
            this.userData = {
                Username: email,
                Pool: this.cognitoUtil.getUserPool()
            };

        }
        else if(environment.emaildomainsaasclient === saasdomain){
             this.userData = {
                Username: email,
                Pool: this.cognitoUtil.getSaaSUserPool()

            };
        }
        else{
            
            return `user email should be a valid user in erpa.com or ${environment.emaildomainsaasclient}`

        }

        let cognitoUser = new CognitoUser(this.userData);

        cognitoUser.confirmPassword(verificationCode, password, {
            onSuccess: function() {
                callback.verfctnCognitoCallback(null, null);
            },
            onFailure: function(err) {
                callback.verfctnCognitoCallback(err.message, null);
            }
        });
    }

}
