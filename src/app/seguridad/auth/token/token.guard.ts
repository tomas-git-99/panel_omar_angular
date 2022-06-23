import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { VentasService } from 'src/app/ventas/servicios/ventas.service';

@Injectable({
  providedIn: 'root'
})
export class TokenGuard implements CanActivate {
  constructor(private router: Router, private VentasService:VentasService) { }

  canActivate(
    
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>{
    


    return this.VentasService.getVerificacionTokenOrden(route.params.token)
    .pipe(map((res:any) => {
      if(res.ok == true){

        this.VentasService.dataOrdenToken = res.data;
        return true
      }else{
        this.router.navigate(['/']);
   
        return false;
      }
    }))
   
  }
  
}
