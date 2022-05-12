import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
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

  IDProductoParaDistribucion:any;

  actualizarDataAlAgregar$ = new EventEmitter<[]>();
  actualizarDataAlEliminar$ = new EventEmitter<any>();



  //agregar

  abrirVentanaAgregraProductos: boolean = false;
  abrirVentanaAgregraTaller: boolean = false;
  abrirVentanaAgregraEstampador: boolean = false;

  ventanaDeAgregarOpciones: boolean = true;

  SalirDelPlano:string = "animate__bounceOutLeft";
  EntrarAlPlano:string = "animate__bounceInRight";


  //recargar pagina 
  actualizarPagina$ = new EventEmitter<any>();

  constructor(private http: HttpClient) { }


  //funciones

  fechaARG(fecha:Date){
    let fechaARG = new Date(fecha);
    let mes = fechaARG.getUTCMonth() + 1;
    let dia = fechaARG.getUTCDate();
    let año = fechaARG.getUTCFullYear();
    return dia + "-" + mes + "-" + año;
  }

  funcOrdenarTalles(array:any[]):string{
    let talles:string = '';

    array.sort((a, b) => parseFloat(a.talle) - parseFloat(b.talle));
    array.forEach((element:any , index:number) => {
      if(index === 0){
        talles += element.talle
      }else{
        talles += '-' + element.talle ;

      }
    })

    return talles;

   
  }
  funcOrdenarYeliminarNombre(array:any[]):string{
     let dataArray:string = '';

    array.forEach( (x:any, index:any) => {
        
        if(dataArray.split(' - ').some( v => v == (x.usuario == null ? '' : x.usuario.nombre) ) == false){

          if(index == 0){
            dataArray = x.usuario.nombre;

          }else{
            dataArray += ' - ' + x.usuario.nombre;
          }
        }
  
    })

    return dataArray; 
  }

  funcConteoTotalDeCantidad(array:[]):number{
    let suma:number = 0;

    array.forEach((element:any) => {
  
      
      if(element.cantidad){
        suma += element.cantidad_actual;
      }
    })

    return suma;
  }

  funcConteoTotalDeCantidadDistribucion(array:[]):number{
    let suma:number = 0;

    array.forEach((element:any) => {
   /*    
      if(element.cantidad){
        suma += element.cantidad;
      }
 */
      element.talle.map(( x:any )=> {
        if(x.cantidad){
          suma += x.cantidad_actual;
        }
      })
    })

    return suma;
  }

  //funciones end

  getObtenerEstampado(busqueda: string = '', pagina: string | number = 0){
    return this.http.get<any>(environment.urlBackendProduccion + 'estampado'+'?keyword=' + busqueda + '&skip=' + pagina );
  }

  postTallerCrear(data:any){
    return this.http.post<any>(environment.urlBackendProduccion + 'taller', data);
  }

  postEstampador(data:any){
    return this.http.post<any>(environment.urlBackendProduccion + 'estampado/estampador', data);
  }


  postProducto(data:any){
    return this.http.post<any>(environment.urlBackendProduccion + 'products', data);
  }
  getProductos(
    busqueda: string = '', 
    pagina: string | number = 0,
    modelo: string = '',
    tela: string = '',
    peso_promedio: string = '',
    taller: string = '',
    dibujo: string = '',
    edad: string = '',
    ) {
    return this.http.get<any>(environment.urlBackendProduccion + 
      'products/all'+'?keyword=' + busqueda + 
      '&skip=' + pagina + 
      '&modelo=' + modelo +
      '&tela=' + tela +
      '&peso_promedio=' + peso_promedio +
      '&taller=' + taller +
      '&dibujo=' + dibujo +
      '&edad=' + edad
      );
  }

  getDistribucion(busqueda: string = '', pagina: string | number = 0){

    return this.http.get<any>(environment.urlBackendProduccion + 'distribucion'+'?keyword=' + busqueda + '&skip=' + pagina );
  }

  getProductosDistribucion(busqueda: string = '', pagina: string | number = 0) {
    return this.http.get<any>(environment.urlBackendProduccion + 'products/distribucion');
  }


  //obtener productos con filtro determinados

  //mientras usamos POST para mandar por el body los filtro, pero vamos a cambiarlo a futuro para mejor rendimiento
  postProductosObtnerProductos(data:any, busqueda:string = '', pagina:number | string = 0 ){
    return this.http.post<any>(environment.urlBackendProduccion + 'products/filtros/all'+'?keyword=' + busqueda + '&skip=' + pagina, data);
  }

  //editar productos 

  putProductosEditar(id_producto:any, data:any){
    
     return this.http.put<any>(environment.urlBackendProduccion + 'products/'+id_producto, data);
   
  }

// obtener taller
  getTaller() {
    return this.http.get<any>(environment.urlBackendProduccion + 'taller');
  }

  getObtenerUsuarios(){
    return this.http.get<any>(environment.urlBackendProduccion + 'usuarios');
  }

  postCrearDistribucion(id_producto:any, id_usuario:any, data:any){
    return this.http.post<any>(environment.urlBackendProduccion + 'distribucion/'+ id_producto + '/' + id_usuario, data);
  }

  getObtenerDistribucionID(id_producto:any){
    return this.http.get<any>(environment.urlBackendProduccion + 'distribucion/'+ id_producto);
  }

  deleteTalleDistribucion(id_talleDistribucion:string){
    return this.http.delete<any>(environment.urlBackendProduccion + 'distribucion/'+ id_talleDistribucion);
  }
  deleteDistribucionTodo(id_distribucion:string){
    return this.http.delete<any>(environment.urlBackendProduccion + 'distribucion/todo/t/'+ id_distribucion);
  }

  getObtenerFechasFiltro(fecha1:Date |string, fecha2:Date | string = ''){
    return this.http.get<any>(environment.urlBackendProduccion + 'ventas/s/fechas?fecha1='+ fecha1 + '&fecha2='+ fecha2);
  }

  putEstampado(id:number | string, data:any){
    return this.http.put<any>(environment.urlBackendProduccion + 'estampado/'+ id, data);
  }


  getObtenerEstampadores(){
    return this.http.get<any>(environment.urlBackendProduccion + 'estampado/estampador');
  }


  getObtenerDataParaPagos(taller:number | string, de:string, hasta:string){
    return this.http.get<any>(environment.urlBackendProduccion + 'pagos/talleres?taller='+ taller + '&de=' + de + '&hasta=' + hasta);
  }

  putPagarTaller(taller:number | string, de:any, hasta:any, data:any){
    return this.http.put<any>(environment.urlBackendProduccion + 'pagos/talleres/pago?taller='+ + taller + '&de=' + de + '&hasta=' + hasta, data);
  }

  putEditarTaller(id_taller:any, data:any){
    return this.http.put<any>(environment.urlBackendProduccion + 'taller/'+ id_taller, data);
  }


  getTallerALL( busqueda:string = '', pagina:number | string = 0 ){
    return this.http.get<any>(environment.urlBackendProduccion + 'taller/full'+'?keyword=' + busqueda + '&skip=' + pagina);
  }

}
