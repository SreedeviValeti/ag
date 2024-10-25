import { AuthenticationService } from './auth.service';
import { User } from './../../shared/model/user';
import { Injectable } from '@angular/core';
import { CognitoCallback, CognitoUtil, LoggedInCallback } from './cognito.service';
import { AuthenticationDetails, CognitoUser, CognitoUserSession } from "amazon-cognito-identity-js";
import * as AWS from "aws-sdk/global";
import { environment } from 'src/environments/environment.prod';
import * as STS from "aws-sdk/clients/sts";
import { Subject, Observable } from 'rxjs';
//import { IdleService } from './idle.service';
import { domain } from "../../shared/constants/adminstration-constants";

@Injectable({
    providedIn: 'root'
})
export class PermissionService {
    userData

    cognitoUser: CognitoUser;
    private userLoggedOut = new Subject<boolean>();

    constructor(public cognitoUtil: CognitoUtil, private authService: AuthenticationService) {
        this.cognitoUser = this.cognitoUtil.getCurrentUser();
        let scope = this;
        if (this.cognitoUser != null) {
            this.cognitoUser.getSession(function (err, session) {
                if (err) {
                    console.log("UserLoginService: Couldn't get the session: " + err, err.stack);
                    // callback.isLoggedIn(err, false);
                    console.log(err);
                }
                else {
                    console.log("UserLoginService: Session is " + session.isValid());
                    console.log(scope.cognitoUser);
                    // callback.isLoggedIn(err, session.isValid());
                }
            });
        }
    }

    setUser(userSession){
        const user = new User(userSession.getAccessToken().getJwtToken(),
        userSession.getIdToken().getJwtToken(), userSession.getIdToken().payload,
        userSession.getIdToken().payload['name']);
      this.authService.setCurrentUser(user);  
    }
    public tokenExpired() {
        if (this.cognitoUser && this.cognitoUser.getSignInUserSession()) {
            this.cognitoUser.getSignInUserSession().getIdToken().payload['username']
this.setUser(this.cognitoUser.getSignInUserSession());
            const expiry = (JSON.parse(atob(this.cognitoUser.getSignInUserSession().getAccessToken().getJwtToken().split('.')[1]))).exp;
            return (Math.floor((new Date).getTime() / 1000)) >= expiry;
        }
        return true;

    }

    triggerLogout(userLoggedIn: boolean) {
        this.userLoggedOut.next(userLoggedIn);
    }

    getLoggedOutObservable(): Observable<boolean> {
        return this.userLoggedOut.asObservable();
    }

    getUserName() {
        return this.cognitoUtil.getCurrentUser();
    }

    logOut(callBack) {
        localStorage.removeItem('currentUser');
        this.cognitoUser.globalSignOut(callBack);
    }

    authenticate(username: string, password: string, callback: CognitoCallback) {
        console.log("UserLoginService: starting the authentication");

        let authenticationData = {
            Username: username,
            Password: password,
        };
        let authenticationDetails = new AuthenticationDetails(authenticationData);
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


        console.log("UserLoginService: Params set...Authenticating the user");
        this.cognitoUser = new CognitoUser(this.userData);
        console.log(this.cognitoUser);
        console.log("UserLoginService: config is " + AWS.config);
        this.cognitoUser.authenticateUser(authenticationDetails, {
            newPasswordRequired: (userAttributes, requiredAttributes) => callback.cognitoCallback(`User needs to set password.`, null),
            onSuccess: result => this.onLoginSuccess(callback, result),
            onFailure: err => this.onLoginError(callback, err),
            mfaRequired: (challengeName, challengeParameters) => {
                callback.handleMFAStep(challengeName, challengeParameters, (confirmationCode: string) => {
                    this.cognitoUser.sendMFACode(confirmationCode, {
                        onSuccess: result => this.onLoginSuccess(callback, result),
                        onFailure: err => this.onLoginError(callback, err)
                    });
                });
            }
        });
    }

    private onLoginSuccess = (callback: CognitoCallback, session: CognitoUserSession) => {

        console.log("In authenticateUser onSuccess callback");

        AWS.config.credentials = this.cognitoUtil.buildCognitoCreds(session.getIdToken().getJwtToken());

        // So, when CognitoIdentity authenticates a user, it doesn't actually hand us the IdentityID,
        // used by many of our other handlers. This is handled by some sly underhanded calls to AWS Cognito
        // API's by the SDK itself, automatically when the first AWS SDK request is made that requires our
        // security credentials. The identity is then injected directly into the credentials object.
        // If the first SDK call we make wants to use our IdentityID, we have a
        // chicken and egg problem on our hands. We resolve this problem by "priming" the AWS SDK by calling a
        // very innocuous API call that forces this behavior.
        let clientParams: any = {};
        if (environment.sts_endpoint) {
            clientParams.endpoint = environment.sts_endpoint;
        }
        let sts = new STS(clientParams);
        sts.getCallerIdentity(function (err, data) {
            console.log("UserLoginService: Successfully set the AWS credentials");
            callback.cognitoCallback(null, session);
        });
        //this.idleService.reset();
    }

    private onLoginError = (callback: CognitoCallback, err) => {
        callback.cognitoCallback(err.message, null);
    }

    changePassword(previousPassword, proposedPassword, callback) {
        /* var params = {
            AccessToken: 'STRING_VALUE', 
            PreviousPassword: previousPassword, 
            ProposedPassword: proposedPassword 
          }; */
        this.cognitoUser.changePassword(previousPassword, proposedPassword, callback);

    }

    isAuthenticated(callback: LoggedInCallback) {
        if (callback == null)
            throw ("UserLoginService: Callback in isAuthenticated() cannot be null");

        this.cognitoUser = this.cognitoUtil.getCurrentUser();

        if (this.cognitoUser != null) {
            this.cognitoUser.getSession(function (err, session) {
                if (err) {
                    console.log("UserLoginService: Couldn't get the session: " + err, err.stack);
                    callback.isLoggedIn(err, false);
                }
                else {
                    console.log("UserLoginService: Session is " + session.isValid());
                    callback.isLoggedIn(err, session.isValid());
                }
            });
        } else {
            console.log("UserLoginService: can't retrieve the current user");
            callback.isLoggedIn("Can't retrieve the CurrentUser", false);
        }
    }

}