import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Orden } from 'src/app/ventas/inter/ordenHistorial';

@Component({
  selector: 'app-edit-products-multiple',
  templateUrl: './edit-products-multiple.component.html',
  styleUrls: ['./edit-products-multiple.component.css']
})
export class EditProductsMultipleComponent implements OnInit {


  @Input()
  arrayOrden!:Orden;

  @Input()
  productoSeleccionadoID!:Number | string;

  @Output()
  cerrarVentana:EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }


  cambiarPrecio(value:any){

    console.log(this.productoSeleccionadoID);
    console.log(this.arrayOrden)
    console.log(value);
  }

}
