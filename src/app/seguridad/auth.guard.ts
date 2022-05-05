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


    let rol = localStorage.getItem('rol');
    let token = localStorage.getItem('id_usuario');
    

    

    if (rol == 'ventas' && route.routeConfig!.path == 'ventas') {

      if( token == null){
        this.router.navigate(['']);
        return false;
      }
      return  true;
    }

    if(rol == 'produccion' && route.routeConfig!.path == 'produccion'){
      if( token == null){
        this.router.navigate(['']);
        return false;
      }
      return true;
    }

    if(rol == 'admin'){
      if( token == null){
        this.router.navigate(['']);
        return false;
      }
      return true;
    }
    
    rol == 'ventas'
    ? this.router.navigate(['/ventas'])
    : this.router.navigate(['/produccion']);

    return false;

  }
  
}
