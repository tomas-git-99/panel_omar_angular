import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {


  menuAbrirCerrar:boolean = true;


  ///
  abrirCerrarVentanModificarUsuario:boolean = false;
  abrirCerrarVentanCrearUsuario:boolean = false
  constructor(private http: HttpClient) { }
 //urlBackendProduccion: 'http://192.168.1.49:3000/'
  //urlBackendProduccion: 'http://137.184.178.187:3000/'


  //crear usuario 

  postCrearUsuario(data:any){
    return this.http.post<any>(environment.urlBackendProduccion + 'usuarios', data)
  }

getObtenerSoloUsuario(){
  return this.http.get<any>(environment.urlBackendProduccion + 'usuarios/todos')
}

putEditarUsuario(id:any, data:any){
  return this.http.put<any>(environment.urlBackendProduccion + 'usuarios/' + id, data)
}

postLogin(data:any){
  return this.http.post<any>('api/usuarios/login', data)
}



}
