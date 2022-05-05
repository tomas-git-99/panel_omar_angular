import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      let token = localStorage.getItem('id_usuario');
      let rol = localStorage.getItem('rol');
     
  
   /*    if(token === null){
        this.router.navigate(['']);
        return true;
      }
  
  
      if(token != null && route.routeConfig!.path == ''){
  
        this.router.navigate(['/produccion']);
        return false;
      } */


      if(token == null && route.routeConfig!.path !== ''){
        this.router.navigate(['']);
      }

      
      if(token != null){
        rol == 'ventas'
        ? this.router.navigate(['/ventas'])
        : this.router.navigate(['/produccion']);
        
      }
      
      return true;
  }
  
}
