import { Component, OnInit } from '@angular/core';

import { ServicioService } from '../servicio.service';
import { VentasService } from '../ventas/servicios/ventas.service';
import { UsuariosNew, Local } from './interface/usuarios';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  arrayUsuarios!:any[]

  arrayUsuariosMandar!:any


  ventanaDeEditNueva:boolean = false;


  usuarioSeleccionEnviar!:UsuariosNew;

  dataLocal!:Local[];
  
  constructor(public servicio:ServicioService, public servicioVentas:VentasService) { }

  ngOnInit(): void {
    this.servicio.getObtenerSoloUsuario().subscribe(
      (res:any)=>{
        console.log(res);
        this.arrayUsuarios = res.data
      }
    )

    this.servicioVentas.getObtenerLocales().subscribe(
      (res:any)=>{
        this.dataLocal = res.data;
      }
    )

  
  }

  modificarUsuario(id:string){
    console.log(id);

    this.arrayUsuarios.find(  e => {
      if(e.id === id){
        console.log(e)
        this.arrayUsuariosMandar = e;
      }
    })

  }

}
