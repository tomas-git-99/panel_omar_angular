import { Component, Input, OnInit } from '@angular/core';
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

  @Input() cantidadPaginas:number = 0;


  fecha_before:Date | string = '';
  fecha_after:Date | string = '';
  localGuardado:string = '';


  arrayDeLocales:any;

  constructor(public servicioVentas:VentasService, public servicioProduccion:ProduccionService) { }

  ngOnInit(): void {
    
    this.servicioVentas.abrirCerrarVentanaOrdenDetalles == true 
    ? this.servicioVentas.abrirCerrarVentanaOrdenDetalles = false
    : '';
    

    this.productosYbuscador();

    this.servicioVentas.getObtenerLocales().subscribe
    (
      res => {
        this.arrayDeLocales = res.data;
      }
    )
   
  }


  productosYbuscador(
    buscador:string = '',
    pagina:number = 0,
    local:string = '',
    fechaInicio:any='', 
    fechaFinal:any=''
  ){
    this.servicioVentas.getObtenerHistorialOrdenes(
      buscador, pagina, local, fechaInicio, fechaFinal
    ).subscribe( 
      res => {
        console.log(res)
        this.arrayTodasLasOrdenes = res.data;
        this.cantidadPaginas = res.contador;
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


  FinalcalcularEltotalDescuento(array:any[], descuento:any[]){
    let total:number = 0;
    let descuentos:number = 0;

    array.map( 
      x =>{
        total += x.precio * x.cantidad ;
      }
    )
 
    descuento.map(
      x =>{
     
        descuentos += x.precio;
      }
    )


    return total - descuentos;

  }
  cargarDetalles(id:string){

    if(this.arrayTodasLasOrdenes.find( (x:any) => x.id === id).estado == false){
      return;
    }else{
      this.mandadoOrdenSeleccionada = this.arrayTodasLasOrdenes.find( (x:any) => x.id === id)
      this.servicioVentas.abrirCerrarVentanaOrdenDetalles = !this.servicioVentas.abrirCerrarVentanaOrdenDetalles;
    }

  

    
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
    this.fecha_before = fecha_1;
    this.fecha_after = fecha_2;

    this.productosYbuscador('', 0, this.localGuardado, this.fecha_before, this.fecha_after)
  }


  //search end
  onKey(value:any){
    this.productosYbuscador(value, 0, this.localGuardado)

  }

  paginacion(paginaSiguiente:any) {
    console.log(paginaSiguiente)
    this.productosYbuscador('', paginaSiguiente, this.localGuardado, this.fecha_before, this.fecha_after);
  }

  cambioDeLocal(data:any) {
    this.localGuardado = data.value;
  }

  reset(){
    this.localGuardado = '';
    this.fecha_before = '';
    this.fecha_after = '';

    this.productosYbuscador()
  }
}
