import { Component, OnInit } from '@angular/core';
import { VentasService } from 'src/app/ventas/servicios/ventas.service';
import { ProduccionService } from '../servicios/produccion.service';

@Component({
  selector: 'app-estampado',
  templateUrl: './estampado.component.html',
  styleUrls: ['./estampado.component.css']
})
export class EstampadoComponent implements OnInit {

  dropDownList:any;
  constructor(public servicioProduccion:ProduccionService, public servicioVentas:VentasService) { }

  valueFilter:boolean = false;

  arrayEstampados!:any[]

  conteoDepagina:number = 0;

  buscadorValor:string = "";

  ngOnInit(): void {

    this.productosYbuscador()

  }
  productosYbuscador(busqueda: string = '', pagina: string | number = 0){

    this.buscadorValor = busqueda;
    this.servicioProduccion.getObtenerEstampado(busqueda, pagina).subscribe(
      (res) => {
        this.arrayEstampados = res.data
       

        this.conteoDepagina = res.contador;
        //this.calcularPaginas(res.contador);

      }
    );

  }

  paginacion(pagina:any){
    this.productosYbuscador(this.buscadorValor , pagina)
  }

  viewFilter(){
    this.valueFilter = !this.valueFilter;
  }

  onKey(value:any){
    console.log(value);
    this.productosYbuscador(value)

  }

  dataSeleccionada:any;

  abrirCerrarVentanaModificarProducto:boolean = false


  editarEstampado(id:number){
    this.arrayEstampados.forEach(element => {
      if(element.id == id){
        this.dataSeleccionada = element;
      }
    });
  }
}
