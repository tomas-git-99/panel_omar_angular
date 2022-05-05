import { Component, OnInit } from '@angular/core';
import { faBan, faCheck, faCheckDouble, faClipboardCheck, faMoneyBill1Wave, faTicket } from '@fortawesome/free-solid-svg-icons';
import { ProduccionService } from 'src/app/produccion/servicios/produccion.service';
import { Orden } from '../inter/ordenHistorial';
import { VentasService } from '../servicios/ventas.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {


  arrayTodasLasOrdenes:any 

  faBan = faBan;
  faCheck = faCheck;
  faCheckDouble = faCheckDouble;
  faMoneyBill1Wave = faMoneyBill1Wave;
  faTicket = faTicket;

  mandadoOrdenSeleccionada:any

  filtrosOpciones:boolean = false
  filtrosFechas:boolean = false

  constructor(public servicioVentas:VentasService, public servicioProduccion:ProduccionService) { }

  ngOnInit(): void {

    this.servicioVentas.getObtenerHistorialOrdenes().subscribe( 
      res => {
        console.log(res)

        this.arrayTodasLasOrdenes = res.data;
      
    }
    )
  }


  calcularEltotal(array:any[]){
    let total:number = 0;

    array.map( 
      x =>{
        total += x.precio * x.cantidad ;
      }
    )
    return total;
  }

  cargarDetalles(id:string){

    this.mandadoOrdenSeleccionada = this.arrayTodasLasOrdenes.find( (x:any) => x.id === id)
    this.servicioVentas.abrirCerrarVentanaOrdenDetalles = !this.servicioVentas.abrirCerrarVentanaOrdenDetalles;

    console.log(id)
  }


  //search 
  valueHomeCategory:string = 'todo'

  filtroPorOpciones:boolean = false;

  filtroPorFechas:boolean = false;


  changeCategory(category: string){
    
    category === this.valueHomeCategory ? this.valueHomeCategory : this.valueHomeCategory = category;
  }


/*   moveCategory(value: string){

    console.log(value)

    value === 'right'
    ? this.categoryScrollX.nativeElement.scrollTo({ left: (this.categoryScrollX.nativeElement.scrollLeft + 150), behavior: 'smooth' })
    : this.categoryScrollX.nativeElement.scrollTo({ left: (this.categoryScrollX.nativeElement.scrollLeft - 150), behavior: 'smooth' })

  }
   */

  funcFiltroDeFechas(fecha_1:Date | any , fecha_2:Date | any){

    console.log(fecha_1, fecha_2)
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    console.log()
   
  }


  //search end


  paginacion(paginaSiguiente:any) {
    console.log(paginaSiguiente)
  }
}
