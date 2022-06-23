import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      let dataUsuario = JSON.parse(localStorage.getItem('dataUsuario') as any);

      console.log(dataUsuario)
      if(dataUsuario == null){
        this.router.navigate(['/']);
        return false;
      }else{
        return true;
      }
  }
  
}
