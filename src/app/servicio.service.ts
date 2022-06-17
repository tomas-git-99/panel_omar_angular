import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ServicioService {


  //activar cada ves que entrar con login 

  loginActivador:EventEmitter<any> = new EventEmitter<any>();

  menuAbrirCerrar: boolean = true;

  ///
  abrirCerrarVentanModificarUsuario: boolean = false;
  abrirCerrarVentanCrearUsuario: boolean = false;



  ventanaDeVentas:boolean = false;
  ventanaDeProduccion:boolean = false;
  ventanaDeUsuario:boolean = false;
    UsuarioDeLaCuenta:string = "";
    constructor(private http: HttpClient, private router: Router) {}


  //funciones 
  abrirVentanasConPermisos() {
    let dataUsuario = JSON.parse(localStorage.getItem('dataUsuario') as any);

    if(dataUsuario == null){
      this.router.navigate(['/']);
      return;
    }
    this.UsuarioDeLaCuenta = dataUsuario.usuario;

    if (dataUsuario.roles == 'ventas') {
      this.ventanaDeVentas = true;
      this.ventanaDeProduccion == true  
      ? this.ventanaDeProduccion = false
      : '';
      this.ventanaDeUsuario == true
      ? this.ventanaDeUsuario = false
      : '';
    }
    if (dataUsuario.roles == 'produccion') {
      this.ventanaDeProduccion = true;
      this.ventanaDeVentas == true
      ? this.ventanaDeVentas = false
      : '';

      this.ventanaDeUsuario == true
      ? this.ventanaDeUsuario = false
      : '';
    }
    if (dataUsuario.roles == 'admin') {
      this.ventanaDeProduccion = true;
      this.ventanaDeVentas = true;
      this.ventanaDeUsuario = true;
    }

  }

  //crear usuario

  postCrearUsuario(data: any) {
    return this.http.post<any>(
      environment.urlBackendProduccion + 'usuarios',
      data
    );
  }

  getObtenerSoloUsuario() {
    return this.http.get<any>(
      environment.urlBackendProduccion + 'usuarios/todos'
    );
  }

  putEditarUsuario(id: any, data: any) {
    return this.http.put<any>(
      environment.urlBackendProduccion + 'usuarios/' + id,
      data
    );
  }

  postLogin(data: any) {
    return this.http.post<any>(
      environment.urlBackendProduccion + 'usuarios/login',
      data
    );
  }


  postAgregarNuevoPermisoLocal(id:number | string, data:{id_local: number | string;}){
    return this.http.post<any>(
      environment.urlBackendProduccion + 'permisos/locales/' + id ,
      data
    );
  }

  postAgregarNuevoPermisoVentana(id:number, data:{ id_ventana: number; nombre: string;}){
    return this.http.post<any>(
      environment.urlBackendProduccion + 'permisos/ventanas/' + id ,
      data
    );
  }

  deleteEliminarPermisoLocal(id:number){
    return this.http.delete<any>(
      environment.urlBackendProduccion + 'permisos/locales/' + id
    );
  }

  deleteEliminarPermisoVentana(id:number){
    return this.http.delete<any>(
      environment.urlBackendProduccion + 'permisos/ventanas/' + id
    );
  }
}
