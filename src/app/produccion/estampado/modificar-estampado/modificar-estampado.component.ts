import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { ProduccionService } from '../../servicios/produccion.service';

@Component({
  selector: 'app-modificar-estampado',
  templateUrl: './modificar-estampado.component.html',
  styleUrls: ['./modificar-estampado.component.css']
})
export class ModificarEstampadoComponent implements OnInit {


  @Input() dataSeleccionadaMODY:any;

  @Output()
  AbrirCerrarVentana:EventEmitter<boolean> = new EventEmitter<boolean>();


  arrayEstampadores:any;

  constructor(public servicioProduccion:ProduccionService) { }

  ngOnInit(): void {
    console.log(this.dataSeleccionadaMODY);


    this.servicioProduccion.getObtenerEstampadores().subscribe(
      (res) => {
  
        this.arrayEstampadores = res.data;

        
      })


  }


  cargaDeBoton:boolean = false;
  modificar(value:any, key:any){

    this.cargaDeBoton = true;
  
    let data ={
      [key]:value
    }



    this.servicioProduccion.putEstampado(this.dataSeleccionadaMODY.id, data).subscribe(
      (res) => {
  
        if(res.ok == true){
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '',
            showConfirmButton: false,
            timer: 1500
          })
          this.cargaDeBoton = false;

          key == 'estampador'
          ? this.dataSeleccionadaMODY.estampador = this.arrayEstampadores.find( (x:any) => x.id == value)
          :this.dataSeleccionadaMODY[key] = value;
        }else{
          this.cargaDeBoton = false;

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo salió mal!',

          })
        }
        
      })
  }

}
