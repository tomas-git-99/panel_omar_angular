import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-producto-nuevo',
  templateUrl: './producto-nuevo.component.html',
  styleUrls: ['./producto-nuevo.component.css']
})
export class ProductoNuevoComponent implements OnInit {

  constructor(private _builder: FormBuilder) { }

  FormularioProductos!:FormGroup;
  isChecked:boolean = false;

  BotonCarga:boolean = false;
  ngOnInit(): void {

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

  formProducto(data:any){
    console.log(data);
  }
/*   checkValue(data:any){
    console.log(data);
  } */

}
