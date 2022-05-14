import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faCircleInfo, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Orden } from 'src/app/ventas/inter/ordenHistorial';

@Component({
  selector: 'app-edit-products-multiple',
  templateUrl: './edit-products-multiple.component.html',
  styleUrls: ['./edit-products-multiple.component.css']
})
export class EditProductsMultipleComponent implements OnInit {

  faInfo = faCircleInfo;
  faMinus = faMinus;
  faPlus = faPlus;

  @Input()
  arrayOrden!:any;

  @Input()
  productoSeleccionadoID!:Number | string;

  @Output()
  cerrarVentana:EventEmitter<boolean> = new EventEmitter<boolean>();

  numeroSeleccionado: number = 0;
  cantidadSeleccionada: number = 0;

  idCarrito!: number;
  dataParaModificar:any;

  arrayDeTallesYproductos:any

  constructor() { }

  ngOnInit(): void {

    console.log(this.arrayOrden);
    this.arrayOrden.map(( x:any) => {
      if(x.id == this.productoSeleccionadoID){
        this.arrayDeTallesYproductos = x ;
      }
    })

    

  }


  cambiarPrecio(value:any){

    console.log(this.productoSeleccionadoID);
    console.log(this.arrayOrden)
    console.log(value);
  }


  eleccionar(numero: number) {

    console.log(numero);
    this.idCarrito = numero;
    this.numeroSeleccionado == numero 
    ?this.numeroSeleccionado = 0
    :this.numeroSeleccionado = numero;

    this.arrayDeTallesYproductos.talles.map((x: any) => {
      if (x.id == numero) {
        this.cantidadSeleccionada = x.cantidad;

        this.dataParaModificar = x
      }
    });
  }

  sumar() {
    this.cantidadSeleccionada += 1;
  }

  restar() {
    this.cantidadSeleccionada -= 1;
  }

  eliminarProducto(id: number) {
    
  }

}
