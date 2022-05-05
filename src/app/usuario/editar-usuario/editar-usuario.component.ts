import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicioService } from 'src/app/servicio.service';
import { VentasService } from 'src/app/ventas/servicios/ventas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  

  arrayLocales!:any[];
  formUsuarioPut!:FormGroup;


  @Input()arrayInfoUsuario!:any;
  
  constructor(private _builder: FormBuilder, public servicioVentas:VentasService, public servicio:ServicioService) { }

  ngOnInit(): void {
    console.log(this.arrayInfoUsuario)
    this.servicioVentas.getObtenerLocales().subscribe(
      (res:any)=>{
        this.arrayLocales = res.data;
      }
    )


    this.formUsuarioPut = this._builder.group({
      usuario:['', Validators.required],
      nombre: ['', Validators.required],
      dni_cuil: ['', Validators.required],
      password: ['', Validators.required],
      local: ['', Validators.required],

    })

  }

  putEditarUsuario(value:any){

    if(value.usuario == '')delete value.usuario;
    if(value.nombre == '')delete value.nombre;
    if(value.dni_cuil == '')delete value.dni_cuil;
    if(value.password == '')delete value.password;
    if(value.local == '')delete value.local;

    if(Object.keys(value).length === 0){
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'No se han realizado cambios',
      
      })
      return;
    }
    
    this.servicio.putEditarUsuario(this.arrayInfoUsuario.id, value).subscribe(
      (res:any)=>{
        
        if(res.ok === true){

          let newdata = this.arrayInfoUsuario as any
          let newLocal = this.arrayLocales as any         

          Object.keys(value).map(function(key, index) {

            if(key == 'local'){
              
              newdata.local.nombre =  newLocal.find( (x:any) => x.id == value.local).nombre

            }else{
              newdata[key] = value[key];

            }

          });
          console.log(newdata);
          
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Usuario editado con exito',
            showConfirmButton: false,
            timer: 1500
          })
        }else{
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Ocurrio un error',
            showConfirmButton: false,
            timer: 1500
          })
        }
      }
    )

  }

}
