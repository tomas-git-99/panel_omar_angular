import { Component, Input, OnInit } from '@angular/core';
import { faTruck } from '@fortawesome/free-solid-svg-icons';
import { IAgregarDistribucion } from 'src/app/produccion/interfaces/interface_produccion';
import { ProduccionService } from 'src/app/produccion/servicios/produccion.service';

@Component({
  selector: 'app-add-productos-produccion',
  templateUrl: './add-productos-produccion.component.html',
  styleUrls: ['./add-productos-produccion.component.css']
})
export class AddProductosProduccionComponent implements OnInit {

  modal: boolean = false;

  ventanaDeAgregar: boolean = false;

  @Input() cerrarVenta!: boolean ;
  modalBtn(){
    this.modal=!this.modal
  }

  AlertaEstado: boolean = false;
  constructor(private servicioProduccion:ProduccionService) {}
 
  faTruck = faTruck

  @Input() cantidad_actual!:number;

  cantidadParaEnviarAdd!:number;

  dataArrayDis: IAgregarDistribucion[] = [];

  ngOnInit(): void {
    
   
    this.cantidad_actual = this.servicioProduccion.cantidadDistribucion$


    this.servicioProduccion.cambiosCantidad$.subscribe(
      (data) => {
        this.cantidad_actual = data;
        this.servicioProduccion.cantidadDistribucion$ = data;
      }
    )




    this.servicioProduccion.cerrarAbrirVentanaDisAgregar$.subscribe(
      (res) => {
        this.ventanaDeAgregar = res;
      }
    )
  }

  viewDeDistribucion(array:any){

    this.dataArrayDis = array;

  }
  cerrarVentanaFun(){


    if(this.dataArrayDis.length > 0){
      this.AlertaEstado = true;
      
    }else{
      this.servicioProduccion.cerrarAbrirVentanaDistribucion$.emit(false);

    }
  }


  abrirYEnviarData(){
    
  }


  
}
