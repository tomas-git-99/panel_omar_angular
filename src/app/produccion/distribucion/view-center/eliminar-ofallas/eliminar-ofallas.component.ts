import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProduccionService } from 'src/app/produccion/servicios/produccion.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-eliminar-ofallas',
  templateUrl: './eliminar-ofallas.component.html',
  styleUrls: ['./eliminar-ofallas.component.css']
})
export class EliminarOfallasComponent implements OnInit {

  @Input() Eliminar!: boolean ;
  @Input() Fallas!: boolean ;
  @Input() ID!: string ;

  @Input() arrayTalles:any  = []


  @Output()
  EmitEliminar:EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  EmitFallas:EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public servicioProduccion:ProduccionService) { }

  ngOnInit(): void {
    this.servicioProduccion.actualizarDataAlEliminar$.subscribe( ()  => {
      this.arrayTalles = []
    })
    
    this.servicioProduccion.IDdistribucion$.subscribe(
      (res) => {
        this.ID = res;
      }
    )

    this.servicioProduccion.arrayFallasEliminar$.subscribe(
      (res) => {
        
        this.arrayTalles = res;
      }
    )

   

  }


  EliminarTalle(id_talleDistribucion:string , talle:string){
    console.log(this.arrayTalles)
    this.servicioProduccion.deleteTalleDistribucion(id_talleDistribucion).subscribe( 
      (res) => {
        if(res.ok == true){
          this.arrayTalles.map( (talles:any,index:any) => {
     
            if(talles.talle == talle){
              this.arrayTalles.splice(index,1)
            }
          })

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: '',
            showConfirmButton: false,
            timer: 1500
          })
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Actualize la pagina, si sigue el error',
          })
        }
      }
    )

  }
   EliminarDistribucionComplet(){
    this.servicioProduccion.deleteDistribucionTodo(this.ID)
    .subscribe(
      res => {
        if(res.ok == true) {
          this.Fallas = false;
          this.arrayTalles = [];
          this.servicioProduccion.actualizarDataAlEliminar$.emit(this.ID)
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: '',
            showConfirmButton: false,
            timer: 1500
          })
          
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Actualize la pagina, si sigue el error',
          })
        }
      }
    )
   }

}
