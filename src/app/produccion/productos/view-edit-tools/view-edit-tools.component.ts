import { Component, Input, OnInit } from '@angular/core';
import { faCheck, faCoffee, faTruck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { IProductosData } from '../../interfaces/interface_produccion';
import { ProduccionService } from '../../servicios/produccion.service';

@Component({
  selector: 'app-view-edit-tools',
  templateUrl: './view-edit-tools.component.html',
  styleUrls: ['./view-edit-tools.component.css']
})
export class ViewEditToolsComponent implements OnInit {
  faTruck = faTruck;
  faExit = faXmark;
  faCheck = faCheck;

  @Input() dataP!:IProductosData;
  @Input() cerrarVentana!:boolean;

  arrayModificadores:any = 
    { 
      codigo:false,
      modelo:false,
fecha_de_corte:false,
edad:false,
rollos:false,
tela:false,
peso_promedio:false,
total_por_talle:false,
talles:false,
total:false,
fecha_de_pago:false,
cantidad_entregada:false,
fecha_de_salida:false,
fecha_de_entrada:false,
estado_pago:false,

taller:false,
    }

  arrayBotonCarga:any ={
    codigo:true,
    modelo:true,
    fecha_de_corte:true,
    edad:true,
    rollos:true,
    tela:true,
    peso_promedio:true,
    total_por_talle:true,
    talles:true,
    total:true,
    fecha_de_pago:true,
    cantidad_entregada:true,
    fecha_de_salida:true,
    fecha_de_entrada:true,
    estado_pago:true,

    taller:true,
  }
  
  constructor(public servicioProduccion:ProduccionService) { }

  ngOnInit(): void {
    
  }

  salirVentana(){
    this.servicioProduccion.cerrarAbrirVentana$.emit(false);
  }


  abrirModificador(nombreVentana:string){
    console.log(nombreVentana)
    this.arrayModificadores[`${nombreVentana}`] =  !this.arrayModificadores[`${nombreVentana}`];

    if(this.arrayBotonCarga[`${nombreVentana}`] == false){
      this.arrayBotonCarga[`${nombreVentana}`] = !this.arrayBotonCarga[`${nombreVentana}`];

    }
  }

  enviarDato(nombre:string, valor:string){
    let formData:any = {};

    formData[`${nombre}`] = valor;

    console.log(valor)
    

    setTimeout(()=>{                           // <<<---using ()=> syntax
      this.arrayBotonCarga[`${nombre}`] = !this.arrayBotonCarga[`${nombre}`];
  }, 1000);
    console.log(formData);
  }

/*   funcVentaView(nombre:string){
    console.log(nombre);
    this.arrayModificadores[`${nombre}`] = !this.arrayModificadores[`${nombre}`];

  } */
}
