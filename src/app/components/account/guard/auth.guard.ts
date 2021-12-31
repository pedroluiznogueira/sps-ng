import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree{
    let mockedToken = window.sessionStorage.getItem('mockedToken');

    if (mockedToken) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
  
}
