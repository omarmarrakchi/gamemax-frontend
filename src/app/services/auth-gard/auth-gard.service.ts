import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from '../login/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      // User is logged in, so return true
      return true;
    }

    // User is not logged in, so redirect to login page
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}