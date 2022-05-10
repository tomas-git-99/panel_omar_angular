import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { VentasService } from '../../servicios/ventas.service';

@Component({
  selector: 'app-agregar-nuevo-local',
  templateUrl: './agregar-nuevo-local.component.html',
  styleUrls: ['./agregar-nuevo-local.component.css']
})
export class AgregarNuevoLocalComponent implements OnInit {

  constructor(public servicioVentas:VentasService) { }

  ngOnInit(): void {
  }

  BotonCarga:boolean = false;

  agregarLocal(nombre:string, direccion:string, telefono:string){

    this.BotonCarga = true;
   
    let data:any = {
      nombre: nombre,
      direccion: direccion,
      telefono: telefono
    }


    Object.keys(data).map(function(key, index) {
      if(data[key] == ''){
        delete data[key];
      }
    });

    

    this.servicioVentas.postCrearLocal(data).subscribe(
      (res:any) => {
        if(res.ok == true){
          
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '',
            showConfirmButton: false,
            timer: 1500
          })
          this.BotonCarga = false;
        

        }else{
          this.BotonCarga = false;


          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo salió mal!',

          })
        }
        (error:any) => {
         
          this.BotonCarga = false;

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo salió mal!',

          })
        }
      }
    )
  }

}
