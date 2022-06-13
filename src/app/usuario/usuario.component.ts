import { Component, OnInit } from '@angular/core';

import { ServicioService } from '../servicio.service';
import { UsuariosNew } from './interface/usuarios';

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

  constructor(public servicio:ServicioService) { }

  ngOnInit(): void {
    this.servicio.getObtenerSoloUsuario().subscribe(
      (res:any)=>{
        console.log(res);
        this.arrayUsuarios = res.data
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
