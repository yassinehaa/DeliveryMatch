import {ActivatedRouteSnapshot, CanActivate, CanActivateFn} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from './services/auth.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    const expectedRoles = route.data['roles'] as string[];
    const user = this.authService.getUser();
    if (!user || !expectedRoles.includes(user.role)) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
