import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
  })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    // if (this.auth.isLoggedIn()) {
    //   return true;
    //}

   return this.auth.peekAuth()
        .pipe(map(isAuth => {
          if(isAuth) {
            return true;
          }
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
          return false;

        }));
  
  }
}
