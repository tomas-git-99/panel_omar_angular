import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { VentasService } from '../../servicios/ventas.service';

@Component({
  selector: 'app-agregar-categoria',
  templateUrl: './agregar-categoria.component.html',
  styleUrls: ['./agregar-categoria.component.css']
})
export class AgregarCategoriaComponent implements OnInit {

  constructor(public servicioVentas:VentasService) { }

  ngOnInit(): void {
  }
  BotonCarga:boolean = false;


  agregarCategoria(nombre:string): void {

    if(nombre == ''){
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'No se puede dejar campos vacios!',

      })

      return;
    }


    this.servicioVentas.postCrearCategoria({nombre: nombre}).subscribe(
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
