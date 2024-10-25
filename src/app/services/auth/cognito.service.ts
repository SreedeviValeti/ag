import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.prod";
import { CognitoUserPool } from "amazon-cognito-identity-js";
import { CognitoIdentity } from "aws-sdk/clients/all";
import * as awsservice from "aws-sdk/lib/service";
import * as AWS from "aws-sdk/global";

export interface CognitoCallback {
    cognitoCallback(message: string, result: any): void;

    pwdCognitoCallback(message: string, result: any): void;

    verfctnCognitoCallback(message: string, result: any): void;

    handleMFAStep?(challengeName: string, challengeParameters: ChallengeParameters, callback: (confirmationCode: string) => any): void;
}

export interface ChallengeParameters {
    CODE_DELIVERY_DELIVERY_MEDIUM: string;

    CODE_DELIVERY_DESTINATION: string;
}

export interface LoggedInCallback {
    isLoggedIn(message: string, loggedIn: boolean): void;
}


@Injectable({
    providedIn:'root'
})
export class CognitoUtil {
    
    public static _USER_POOL_ID = environment.userPoolId;
    public static _CLIENT_ID = environment.clientId;
    public static _REGION = environment.region;
    public static _IDENTITY_POOL_ID = environment.identityPoolId;
    //for saas
    public static _SAAS_USER_POOL_ID = environment.saasclientuserPoolId;
    public static _SAAS_CLIENT_ID = environment.saasclientId;
 
/*
public static _USER_POOL_ID = environment.dashboard.userPoolId;
public static _CLIENT_ID = environment.dashboard.clientId;
public static _REGION = environment.dashboard.region;
public static _IDENTITY_POOL_ID = environment.dashboard.identityPoolId; */
    public static _POOL_DATA: any = {
        UserPoolId: CognitoUtil._USER_POOL_ID,
        ClientId: CognitoUtil._CLIENT_ID
    };
    public static _SAAS_POOL_DATA: any = {
        UserPoolId: CognitoUtil._SAAS_USER_POOL_ID,
        ClientId: CognitoUtil._SAAS_CLIENT_ID
    };

    public cognitoCreds: AWS.CognitoIdentityCredentials;

    getUserPool() {
        if (environment.cognito_idp_endpoint) {
            CognitoUtil._POOL_DATA.endpoint = environment.cognito_idp_endpoint;
        }
        return new CognitoUserPool(CognitoUtil._POOL_DATA);
    }
    getSaaSUserPool(){
        if (environment.cognito_idp_endpoint) {
            CognitoUtil._POOL_DATA.endpoint = environment.cognito_idp_endpoint;
        }
        return new CognitoUserPool(CognitoUtil._SAAS_POOL_DATA);

    }



    
    // This method takes in a raw jwtToken and uses the global AWS config options to build a
    // CognitoIdentityCredentials object and store it for us. It also returns the object to the caller
    // to avoid unnecessary calls to setCognitoCreds.

    buildCognitoCreds(idTokenJwt: string) {
        let url = 'cognito-idp.' + CognitoUtil._REGION.toLowerCase() + '.amazonaws.com/' + CognitoUtil._USER_POOL_ID;
        if (environment.cognito_idp_endpoint) {
            url = environment.cognito_idp_endpoint + '/' + CognitoUtil._USER_POOL_ID;
        }
        let logins: CognitoIdentity.LoginsMap = {};
        logins[url] = idTokenJwt;
        let params = {
            IdentityPoolId: CognitoUtil._IDENTITY_POOL_ID, /* required */
            Logins: logins
        };
        let serviceConfigs = <awsservice.ServiceConfigurationOptions>{};
        if (environment.cognito_identity_endpoint) {
            serviceConfigs.endpoint = environment.cognito_identity_endpoint;
        }
        let creds = new AWS.CognitoIdentityCredentials(params, serviceConfigs);
        this.setCognitoCreds(creds);
        return creds;
    }

    // AWS Stores Credentials in many ways, and with TypeScript this means that
    // getting the base credentials we authenticated with from the AWS globals gets really murky,
    // having to get around both class extension and unions. Therefore, we're going to give
    // developers direct access to the raw, unadulterated CognitoIdentityCredentials
    // object at all times.
    setCognitoCreds(creds: AWS.CognitoIdentityCredentials) {
        this.cognitoCreds = creds;
    }

    getCognitoIdentity(): string {
        return this.cognitoCreds.identityId;
    }

    //need to understand
    getCurrentUser() {
        if(this.getUserPool().getCurrentUser() == null){
            return this.getSaaSUserPool().getCurrentUser();
        }
        else{
            return this.getUserPool().getCurrentUser();

        }
    }

    refresh(): void {
        this.getCurrentUser().getSession(function (err, session) {
            if (err) {
                console.log("CognitoUtil: Can't set the credentials:" + err);
            }

            else {
                if (session.isValid()) {
                    console.log("CognitoUtil: refreshed successfully");
                } else {
                    console.log("CognitoUtil: refreshed but session is still not valid");
                }
            }
        });
    }

}
