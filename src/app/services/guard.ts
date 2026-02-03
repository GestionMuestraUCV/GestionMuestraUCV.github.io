/*import { inject } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { CanActivateFn, Router } from '@angular/router';
import { map, take, tap } from 'rxjs';

export const AuthGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  // Using authState (Observable) is safer than currentUser
  // because it waits for Firebase to initialize.
  return authState(auth).pipe(
    take(1),
    map(user => !!user),
    tap(isLoggedIn => {
      if (!isLoggedIn) {
        console.log('Access denied - Redirecting to login');
        router.navigate(['/auth/login']);
      }
    })
  );
};*/

import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanActivate, CanActivateChild {
  constructor( private auth: Auth, private router: Router) {}

  canActivateChild(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    return this.checkLogin(state.url);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    return this.checkLogin(state.url);
  }

  checkLogin(url: string): boolean {
    let user= this.auth.currentUser
    if (user) { return true; }

    this.router.navigate(['/']);
    return false;
  }
}
