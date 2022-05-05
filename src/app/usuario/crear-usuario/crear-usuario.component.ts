import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicioService } from 'src/app/servicio.service';
import { VentasService } from 'src/app/ventas/servicios/ventas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  formUsuario!:FormGroup;

  arrayLocales!:any[];
  constructor(private _builder: FormBuilder, public servicioVentas:VentasService, public servicio:ServicioService) { }

  ngOnInit(): void {

    this.servicioVentas.getObtenerLocales().subscribe(
      (res:any)=>{
        this.arrayLocales = res.data;
      }
    )

    this.formUsuario = this._builder.group({
      usuario:['', Validators.required],
      nombre: ['', Validators.required],
      dni_cuil: ['', Validators.required],
      password: ['', Validators.required],
      roles: ['', Validators.required],
      local: ['', Validators.required],

    })
  }


  nuevoUsuario(
    value:{usuario:string, nombre:string, dni_cuil:string, password:string, roles:string, local:string | null}
    ): void {

      if(value.usuario == '' || value.password == '' ){
        Swal.fire({
          icon: 'warning',
          title: 'Debe completar todos los campos de usuario y contraseña',
        })
  

        return;
      }

    if(value.roles == ''){
      Swal.fire({
        icon: 'warning',
        title: 'Debe seleccionar un rol',
      })
      return;

    }

    if(value.roles == 'ventas' && value.local == ''){
      Swal.fire({
        icon: 'warning',
        title: 'Debe seleccionar un local',

      })
      return;

    }


    if(value.local == '' || value.roles != 'ventas'){
      value.local = null;
  
    }

    this.servicio.postCrearUsuario(value).subscribe(
      (res:any)=>{
        if(res.ok == true){
          Swal.fire({
            icon: 'success',
            title: 'Usuario creado con exito',
          })
          this.formUsuario.reset();
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Error al crear usuario',
          })            
        }
    
      }
    )



    
  }

}
