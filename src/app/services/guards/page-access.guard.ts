import { Observable, of } from 'rxjs';
import { AuthenticationService } from './../auth/auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PageAccessGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthenticationService) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,

    ): boolean {
        let hasAccess = true;
        const accessRoles = (route.data && route.data.accessRoles) ? route.data.accessRoles : [];
        if (accessRoles.length > 0) {
            hasAccess = this.authService.hasRoles(accessRoles);
        }
        if (hasAccess) {
            return hasAccess;
        } else {
            this.router.navigate(['/']);
        }
        return false;

    }
}