import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isAdmin()) {
      return true;
    } else if (this.authService.isUser()) {
      this.router.navigate(['profile']);
      return false;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
