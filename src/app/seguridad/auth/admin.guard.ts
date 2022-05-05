import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let rol = localStorage.getItem('rol');


    if(rol == 'admin'){
      

      return true;
    }


    rol == 'ventas'
    ? this.router.navigate(['/ventas'])
    : this.router.navigate(['/produccion']);
    return false;

/* 
    let token = localStorage.getItem('id_usuario');
    console.log(route.routeConfig!.path)

    if(token === null){
      this.router.navigate(['']);
      return false;
    }


    if(token != null && route.routeConfig!.path == ''){

      this.router.navigate(['/produccion']);
      return false;
    }

    return true; */
  }
  
}
