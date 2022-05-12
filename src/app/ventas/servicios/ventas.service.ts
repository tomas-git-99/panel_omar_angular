import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Carrito } from '../inter/carrito';
import { HistorialOrden } from '../inter/ordenHistorial';
import { Distribucion, ProductosVentasTodos, TallesVenta } from '../inter/productosVentasTodos';
import { ProductosVentas } from '../inter/ventas';

@Injectable({
  providedIn: 'root'
})
export class VentasService {


  //add-sales
  IDdistribucion$ = new EventEmitter<string>();
  abrirCerrarVentana:boolean = false;

  //add-failures
  abrirCerrarVentanaFailures:boolean = false;

  //cliente-existente
  abrirCerrarVentanaClienteExistente:boolean = false;

  //agregar a carrito 
  abrirCerrarVentanaCarrito:boolean = false;
  arrayDeProductoCarrito$ = new EventEmitter();
  abrirCerrarVentanaCarritoDeCompras:boolean = false;

  totalDeSoloProducto$ = new EventEmitter<number>();


  //opciones de orden cambiar precio, agregar orden, descuento 

  abrirCerrarVentanaCambiarPrecio:boolean = false;

  abrirCerrarVentanaAgregarNota:boolean = false;

  abrirCerrarVentanaDescuento:boolean = false;

  actualizarLista$ = new EventEmitter();


  //history, historial de ordenes

  abrirCerrarVentanaOrdenDetalles:boolean = false;


  //modificar productos con
  abrirCerrarVentanaModificarProducto:boolean = false;


  //opciones

  abrirCerrarVentanaMigrarProducto:boolean = false;

  abrirCerrarVentanaAgregarCategorias:boolean = false; 

  abrirCerrarVentanaAgregarLocal:boolean = false;


  agregarDisctribucionArray:any;

  constructor(private http: HttpClient) { 

  }



  evitarNulloVacios(data:any){

    if(data == null || data == ''){
      return '- -';
    }else{
      return data;
    }

  }


  funcOrdenarTalles(array:any[]):string{
    let talles:string = '';

    array.sort((a, b) => parseFloat(a.talles) - parseFloat(b.talles));

    array.forEach((element:any , index:number) => {
      if(index === 0){
        talles += element.talles
      }else{
        talles += '-' + element.talles ;

      }
    })

    return talles;

   
  }


  funcConteoTotalDeCantidad(array:any[]):number{
    let suma:number = 0;

    array.forEach((element:any) => {
  
      
      if(element.cantidad){
        suma += element.cantidad;
      }
    })

    return suma;
  }

  funcVericarSiEsNullProducto(array:Distribucion[]):TallesVenta[]{


    let arrayTalles:TallesVenta[] = [];

    
    for( let i of array){

      if(i.productoVentas != null){

        arrayTalles = i.productoVentas.talles_ventas;
      }

    }

    return arrayTalles;

    
  }
  funcConteoTotalDeProducto(array:Distribucion[]){

    let suma:number = 0;

    array.forEach((x) => {

      if(x.productoVentas != null){
        x.productoVentas.talles_ventas.map((y) => suma += y.cantidad)
      }
    })

    return suma;

  }


  getProductos(
    busqueda:string = '', 
    pagina:string | number= '',
    local:any = '',
    categoria:any = '',
    codigo:any = '',
    dibujo:any = '',
    color:any = '',
    take:string | number= '',
    ){
    return this.http.get<ProductosVentas>(environment.urlBackendProduccion + 'productos-ventas/full'+
    '?keyword='+ busqueda + 
     '&skip=' + pagina + 
      '&local=' + local +
     '&categoria=' + categoria +
     '&codigo=' + codigo +
     '&dibujo=' + dibujo +
     '&color=' + color + 
     '&take=' + take);
  }

  postAgregarCarrito(id_usuario:any,id_producto:number,data:any){
    return this.http.post(environment.urlBackendProduccion + 'carrito/'+ id_usuario + '/' + id_producto , data);
  }

  getObtenerCarrito(id_usuario:any){
    return this.http.get<Carrito>(environment.urlBackendProduccion + 'carrito/'+ id_usuario);
  }


  getObtenerCliente(keyword:string){

    return this.http.get<any>(environment.urlBackendProduccion + 'cliente/?keyword='+ keyword);
  }


  //crear direccion nueva para cliente 

  postCrearDireccion(id_cliente:any, data:any){
    return this.http.post(environment.urlBackendProduccion + 'cliente/direccion/'+ id_cliente , data);
  }

  // obtener locales

  getObtenerLocales(){
    return this.http.get<any>(environment.urlBackendProduccion + 'local');
  }

  // generar orden

  postGenerarOrden(id_usuario:any, data:any){
    return this.http.post(environment.urlBackendProduccion + 'orden/'+ id_usuario , data);
  }

  //obtener historial de ordenes 

  getObtenerHistorialOrdenes(busqueda:string = '', pagina:string | number= ''){
    return this.http.get<HistorialOrden>(environment.urlBackendProduccion + 'orden'+'?keyword=' + busqueda + '&skip=' + pagina);
  }

  postCrearProductosParaVenta(id_distribucion:any, data:any){
    return this.http.post(environment.urlBackendProduccion + 'products/distribucion/'+ id_distribucion , data);
  }

  getObtenerCategorias(){
    return this.http.get<any>(environment.urlBackendProduccion + 'categoria');
  }

  getObtenerProductos(
    busqueda:string = '', 
    pagina:string | number = '',
    modelo:string | boolean = '',
    dibujo:string | boolean = '',
    color:string | boolean = '',
    local:number | string = '',
    take:number | string = '',
    ){

      return this.http.get<ProductosVentasTodos>(
        environment.urlBackendProduccion + 'productos-ventas'+
      '?keyword=' + busqueda + 
      '&skip=' + pagina + 
      '&modelo=' + modelo + 
      '&dibujo=' + dibujo + 
      '&color=' + color + 
      '&local=' + local 
      + '&take=' + take);
  }

  putEditarProducto(id:number | undefined, data:any){

    return this.http.put(environment.urlBackendProduccion + 'productos-ventas/'+ id , data);
  }


  getObtenerProductosSOLOPorLocal(  
    busqueda:string = '', 
  pagina:string | number = '',
  local:number | string = '',
  take:number | string = '',
  ){
    return this.http.get<ProductosVentas>(environment.urlBackendProduccion + 'productos-ventas/full/local'+
    '?keyword='+ busqueda + 
     '&skip=' + pagina + 
      '&local=' + local +
     '&take=' + take);
  }


  
  getObtenerOrdenPorID(id:any){
    return this.http.get<any>(environment.urlBackendProduccion + 'orden/'+ id);  
  }

  deleteCarritoSoloUno(id_carrito:any){
    return this.http.delete(environment.urlBackendProduccion + 'carrito/'+ id_carrito);
  }

  putEditarCarrito(id_carrito:any, data:any){
    return this.http.put(environment.urlBackendProduccion + 'carrito/'+ id_carrito , data);
  }

  postCrearLocal(data:any){
    return this.http.post(environment.urlBackendProduccion + 'local' , data);
  }

  postCrearCategoria(data:any){
    return this.http.post(environment.urlBackendProduccion + 'categoria' , data);
  }

  postCrearProuductoVentas(data:any){
    return this.http.post(environment.urlBackendProduccion + 'productos-ventas' , data);
  }

  putEditarCliente(id_cliente:any,data:any){
    return this.http.put(environment.urlBackendProduccion + 'cliente/'+id_cliente, data);
  }

  putEditarDireccion(id_direccion:any,data:any){
    return this.http.put(environment.urlBackendProduccion + 'cliente/direccion/'+id_direccion, data);
  }

  putEditarOrdenEstado(id:any,data:any){
    return this.http.put(environment.urlBackendProduccion + 'estado-orden/'+id, data);
  }

  putEditarTallesVentas(id:any,data:any){
    return this.http.put(environment.urlBackendProduccion + 'ventas-talles/'+id, data);
  }

  deleteProductoVenta(id:any){
    return this.http.delete(environment.urlBackendProduccion + 'productos-ventas/'+id);
  }
}
