import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { IProductosData } from '../interfaces/interface_produccion';

@Injectable({
  providedIn: 'root'
})
export class ProduccionService {


  dataParaVerProdcuto$ = new EventEmitter<IProductosData>();
  cerrarAbrirVentana$ = new EventEmitter<boolean>();


  //Distribucion
  cerrarAbrirVentanaDistribucion$ = new EventEmitter<boolean>();
  cerrarAbrirVentanaDisAgregar$ = new EventEmitter<boolean>();

  cantidadDistribucion$:number = 0;

  cambiosCantidad$ = new EventEmitter<number>();
  IDdistribucion$ = new EventEmitter<string>();

  arrayFallasEliminar$ = new EventEmitter<[]>();
  arrayFallasEliminar = [];

  constructor(private http: HttpClient) { }


  fechaARG(fecha:Date){
    let fechaARG = new Date(fecha);
    let mes = fechaARG.getUTCMonth() + 1;
    let dia = fechaARG.getUTCDate();
    let año = fechaARG.getUTCFullYear();
    return dia + "-" + mes + "-" + año;
  }


  getProductos(busqueda: string = '', pagina: string | number = 0) {
    return this.http.get<any>(environment.urlBackendProduccion + 'products/all'+'?keyword=' + busqueda + '&skip=' + pagina);
  }

  getDistribucion(busqueda: string = '', pagina: string | number = 0){

    return this.http.get<any>(environment.urlBackendProduccion + 'distribucion'+'?keyword=' + busqueda + '&skip=' + pagina);
  }
}
