import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthStateService } from '../auth-state.service';
import { TokenService } from '../token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(
    public tokenService:TokenService,
    public authStateService: AuthStateService,
    private router: Router

  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.tokenService.isLoggedIn() || this.router.url == "/sign-up"){
      return true;
    }

    // navigate to login page
    this.router.navigate(['/sign-in']);
    return false;
  }

}
