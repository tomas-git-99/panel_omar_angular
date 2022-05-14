import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { ProduccionService } from '../../servicios/produccion.service';

@Component({
  selector: 'app-estampadores',
  templateUrl: './estampadores.component.html',
  styleUrls: ['./estampadores.component.css']
})
export class EstampadoresComponent implements OnInit {


  @Output()
  AbrirCerrarVentana:EventEmitter<boolean> = new EventEmitter<boolean>();


  abrirVentanaImprimir:boolean = false;

  arrayEstampadores:any;
  dataDeFechas:any;

  constructor(public servicioProduccion:ProduccionService) { }

  ngOnInit(): void {

    this.servicioProduccion.getObtenerEstampadores().subscribe(
      (res)=>{
        this.arrayEstampadores = res.data;
      }
    )
  }


  dataProducto:any;

  enviarParaElfiltro(estampadores:number | string, de:string, hasta:string):any{


    if(estampadores == '' || de == '' || hasta == ''){
      return Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Por favor, llene todos los campos',

      })
    }

    this.servicioProduccion.getObtenerDataParaPagosEstampadores(estampadores, de, hasta).subscribe(
      (res)=>{

        this.dataDeFechas = {
          estampador: this.arrayEstampadores.find((x:any) => x.id == estampadores),
          de: de,
          hasta: hasta
        }
       
        this.dataProducto = res.data;
        this.abrirVentanaImprimir = true;

        console.log(res);
        
      })

  }

}
