import { Role } from './../../shared/constants/app.constants';
import { AuthenticationService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { InitialApiLoaderService } from '../initial-apiloader.service';
import { PermissionService } from '../auth/permission.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private permService: PermissionService,
        private authService: AuthenticationService,
        private initialApiLoaderService: InitialApiLoaderService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.permService.tokenExpired()) {
            /*      console.log(route.url);
                 const userDetails = this.authService.currentUser.userdetails;
                 const url = "/home/administration/CampusSolutions/edit/";
                 if (state.url.indexOf(url) !== -1) {
                     if (userDetails && userDetails['cognito:groups'].indexOf(Role.ERPA_ADMIN_GROUP) !== -1) {
                         return true;
                     } else {
                         this.router.navigate(['/']);
                       
                     }
                 }
      */
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}