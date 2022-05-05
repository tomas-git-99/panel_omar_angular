import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ProduccionService } from '../../servicios/produccion.service';

@Component({
  selector: 'app-producto-nuevo',
  templateUrl: './producto-nuevo.component.html',
  styleUrls: ['./producto-nuevo.component.css']
})
export class ProductoNuevoComponent implements OnInit {

  constructor(private _builder: FormBuilder, public servicioProduccion:ProduccionService) { }

  FormularioProductos!:FormGroup;
  isChecked:boolean = false;

  BotonCarga:boolean = false;
  arrayTaller:any
  ngOnInit(): void {


    this.servicioProduccion.getTaller().subscribe( 
      res => {

        this.arrayTaller = res.data;
      }
    )

    this.FormularioProductos = this._builder.group({
      codigo: ['', Validators.required],
      modelo: ['', Validators.required],
      fecha_de_corte: ['', Validators.required],
      edad: ['', Validators.required],
      tela: ['', Validators.required],
      rollos: ['', Validators.required],
      peso_promedio: ['', Validators.required],
      total_por_talle: ['', Validators.required],
      talles: ['', Validators.required],
      total: ['', Validators.required],
      estado_estampado: ['', Validators.required],
      id_taller: new FormControl(''),
      fecha_de_salida: ['', Validators.required],
      fecha_de_entrada: ['', Validators.required],
    })

  }

  sumaTotal(talles:any, totalPorTalle:any):any {
    return talles * totalPorTalle;
  }
  formProducto(data:any){

    Object.keys(data).map(function(key, index) {
      if(data[key] == ''){
        delete data[key];
      }
    });

    this.BotonCarga = true;
    this.servicioProduccion.postProducto(data).subscribe
    (
      res => {
        if(res.ok == true){
          
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '',
            showConfirmButton: false,
            timer: 1500
          })

          this.BotonCarga = false;

          this.FormularioProductos.reset();

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
/*   checkValue(data:any){
    console.log(data);
  } */

}
