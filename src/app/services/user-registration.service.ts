import { Injectable } from "@angular/core";
import { CognitoUtil, CognitoCallback } from "./auth/cognito.service";
import { CognitoUserAttribute, CognitoUser } from "amazon-cognito-identity-js";
import { domain } from "../shared/constants/adminstration-constants";
import { environment } from "src/environments/environment.prod";


@Injectable({
    providedIn:'root'
})
export class UserRegistrationService {
    userData;

    constructor(public cognitoUtil: CognitoUtil) {

    }
    
    register(name, email, password, callback){

        let attributeList = [];

        let dataEmail = {
            Name: 'email',
            Value: email
        };
        let dataName = {
            Name: 'name',
            Value: name
        }; 
       
        attributeList.push(new CognitoUserAttribute(dataName)); 
        attributeList.push(new CognitoUserAttribute(dataEmail)); 

        var saasdomain = email.split('@')[1]
        if('erpa.com' === saasdomain){
            this.cognitoUtil.getUserPool().signUp(email, password, attributeList, null, function(err, result) {
                if (err) {
                    callback.cognitoCallback(err.message, null);
                } else {
                    // console.log("UserRegistrationService: registered user is " + result);
                    callback.cognitoCallback(null, result);
                }
            });

        }
        else if(environment.emaildomainsaasclient === saasdomain){
            this.cognitoUtil.getSaaSUserPool().signUp(email, password, attributeList, null, function(err, result) {
                if (err) {
                    callback.cognitoCallback(err.message, null);
                } else {
                    // console.log("UserRegistrationService: registered user is " + result);
                    callback.cognitoCallback(null, result);
                }
            });

        }
        else{
            
            return `user email should be a valid user in erpa.com or ${environment.emaildomainsaasclient}`

        }
    }

    confirmRegistration(username: string, confirmationCode: string, callback){
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

        cognitoUser.confirmRegistration(confirmationCode, true, function(err, result) {
            if (err) {
                callback.cognitoCallback(err.message, null);
            } else {
                callback.cognitoCallback(null, result);
            }
        });
    }

}