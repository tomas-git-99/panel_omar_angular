import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { VentasService } from '../../servicios/ventas.service';

@Component({
  selector: 'app-agregar-grup-productos',
  templateUrl: './agregar-grup-productos.component.html',
  styleUrls: ['./agregar-grup-productos.component.css']
})
export class AgregarGrupProductosComponent implements OnInit {
  FormularioProductos!:FormGroup;

  
  BotonCarga:boolean = false;
  isChecked:boolean = false;

  @Output()
  cerrarVentana:EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private _builder: FormBuilder,public servicioVentas:VentasService) { 
   
  }

  ngOnInit(): void {
    this.FormularioProductos = this._builder.group({
      codigo: ['', Validators.required],
      modelo: ['', Validators.required],
      edad: ['', Validators.required],
      tela: ['', Validators.required],
      dibujo: ['', Validators.required],
    })
  }





  formProducto(data:any){

    Object.keys(data).map(function(key, index) {
      if(data[key] == ''){
        delete data[key];
      }
    });


    this.servicioVentas.postCrearGrupo(data)
    .subscribe ( (x:any) => {

      if(x.ok == true){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: '',
          showConfirmButton: false,
          timer: 1500
        })
        this.FormularioProductos.reset();

       
      }

      if(x.ok == false){
       
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo salió mal!',

        })
      }
    })



   
  }

}
