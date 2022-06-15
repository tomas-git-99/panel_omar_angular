import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { ProduccionService } from '../../servicios/produccion.service';

@Component({
  selector: 'app-talleres',
  templateUrl: './talleres.component.html',
  styleUrls: ['./talleres.component.css']
})
export class TalleresComponent implements OnInit {




  @Output()
  AbrirCerrarVentana:EventEmitter<boolean> = new EventEmitter<boolean>();


  abrirVentanaImprimir:boolean = false;

  arrayTaller:any;
  dataDeFechas:any;

  constructor(public servicioProduccion:ProduccionService) { }

  ngOnInit(): void {

    this.servicioProduccion.getTaller().subscribe(
      (res)=>{
        this.arrayTaller = res.data;
        
      }
    )
  }


  dataProducto:any;

  enviarParaElfiltro(taller:number | string, de:string, hasta:string):any{


    if(taller == '' || de == '' || hasta == ''){
      return Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Por favor, llene todos los campos',

      })
    }

    this.servicioProduccion.getObtenerDataParaPagos(taller, de, hasta).subscribe(
      (res)=>{

        this.dataDeFechas = {
          taller: this.arrayTaller.find((x:any) => x.id == taller),
          de: de,
          hasta: hasta
        }

        if(res.data === [] || res.data.length === 0){

          Swal.fire({
            icon: 'info',
            title: 'Oops...',
            text: 'No ahi ningun producto con esas fechas. Verifique bien',
          })

          return;
        }else{
          this.dataProducto = res.data;
          this.abrirVentanaImprimir = true;
        }
       
     

   

        
      })

  }

}
