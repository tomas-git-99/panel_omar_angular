import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProduccionService } from 'src/app/produccion/servicios/produccion.service';


@Component({
  selector: 'app-eliminar-ofallas',
  templateUrl: './eliminar-ofallas.component.html',
  styleUrls: ['./eliminar-ofallas.component.css']
})
export class EliminarOfallasComponent implements OnInit {

  @Input() Eliminar!: boolean ;
  @Input() Fallas!: boolean ;
  @Input() ID!: string ;

  arrayTalles:any  = []


  @Output()
  EmitEliminar:EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  EmitFallas:EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public servicioProduccion:ProduccionService) { }

  ngOnInit(): void {
    this.servicioProduccion.IDdistribucion$.subscribe(
      (res) => {
        console.log(res)
      }
    )

    this.servicioProduccion.arrayFallasEliminar$.subscribe(
      (res) => {
        
        this.arrayTalles = res;
      }
    )

   

  }

}
