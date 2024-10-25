import { ROLES } from './../../shared/constants/adminstration-constants';
import { PermissionService } from './permission.service';
import { Injectable } from '@angular/core';

import { User } from './../../shared/model/user';
import * as _ from 'lodash';




@Injectable({providedIn:'root'})
export class AuthenticationService {
    public currentUser: User;
    private ADMIN_GROUP = ROLES.ADMIN_GROUP;
    private ERPA_ADMIN_GROUP = ROLES.ERPA_ADMIN_GROUP;

    //  private  = new Subject<boolean>();

    constructor(
    ) {

        const user = localStorage.getItem('currentUser');
        if (user) {
            this.currentUser = JSON.parse(user);
        }
    }

    getUser() {
        return this.currentUser.userdetails['name'];
    }

    public setCurrentUser(user: User) {
        this.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
    }

    public removeUser() {
        localStorage.removeItem('currentUser');
        this.currentUser = null;
    }
    hasGrants() {
        const userDetails = this.currentUser.userdetails;
        if (userDetails && userDetails['cognito:groups'].indexOf(this.ADMIN_GROUP) !== -1) {
            return true;
        }
        return false;
    }

    hasRoles(roles) {
        const userDetails = this.currentUser.userdetails;
        if (userDetails && _.intersection(userDetails['cognito:groups'], roles).length > 0) {
            return true;
        }
        return false;
    }

    isERPAAdmin() {
        const userDetails = this.currentUser.userdetails;
        if (userDetails && userDetails['cognito:groups'].indexOf(this.ERPA_ADMIN_GROUP) !== -1) {
            return true;
        }
        return false;
    }

    public isLoggedIn() {
        const localStorageUser = JSON.parse(localStorage.getItem('currentUser'));
        this.currentUser = this.currentUser;
        if (this.currentUser || localStorageUser) {
            return true;
        }
        return false;
    }

}
