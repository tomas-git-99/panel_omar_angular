import { Component, OnInit } from '@angular/core';
import { ProduccionService } from 'src/app/produccion/servicios/produccion.service';
import { VentasService } from 'src/app/ventas/servicios/ventas.service';

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.css']
})
export class SearchProductsComponent implements OnInit {
  isList:any;
  subList = 3;

  arrayLocales:any;


  arrayProductos:any
  constructor(public servicioVentas:VentasService, public servicioProduccion:ProduccionService) { }

  ngOnInit(): void {
    this.servicioVentas.getObtenerLocales().subscribe(
      (res)=>{
       
        this.arrayLocales = res.data;
      }
    )

    
  }

  onKey(valor:any, local:any){
    console.log(valor)
  
    console.log( local.value)

    this.servicioVentas.getProductos( 
      valor, 
      0,
      local.value,
      '',
      'true', 
      '', 
      '', 
      100 ).subscribe(
      (res)=>{
        console.log(res)
      /*   this.arrayProductos = res.data;
        console.log(this.arrayProductos) */

      })
  }
}
