import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ProduccionService } from '../../servicios/produccion.service';

@Component({
  selector: 'app-agregar-estampador',
  templateUrl: './agregar-estampador.component.html',
  styleUrls: ['./agregar-estampador.component.css']
})
export class AgregarEstampadorComponent implements OnInit {
  formMandarData!:FormGroup;
  BotonCarga:boolean = false;

  constructor(public servicioProduccion:ProduccionService, private _builder: FormBuilder) { }

  ngOnInit(): void {
    this.formMandarData = this._builder.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
    });

  }

  enviarForm(data: any){

    Object.keys(data).map(function(key, index) {
      if(data[key] == ''){
        delete data[key];
      }
    });
    this.BotonCarga = true;

    
    this.servicioProduccion.postEstampador(data).subscribe
    (
      res => {
        if(res.ok == true){
          console.log(res);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '',
            showConfirmButton: false,
            timer: 1500
          })
          this.BotonCarga = false;

          this.formMandarData.reset();

        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo salió mal!',

          })
          this.BotonCarga = false;

        }
        (error:any) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo salió mal!',

          })
          this.BotonCarga = false;

        }
      }
    )
  }
}
