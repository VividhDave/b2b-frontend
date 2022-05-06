import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomHttpService } from '../service/custom-service/custom-http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private customHttpService: CustomHttpService, private router: Router) {

  }

  canActivate( route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.customHttpService.isLoggedIn()) {
      this.router.navigate(['/home/sign-in']);
        return false;
    }
    return true;   
}
  
}
