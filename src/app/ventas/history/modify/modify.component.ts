import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faTrash, faWrench } from '@fortawesome/free-solid-svg-icons';
import { ProduccionService } from 'src/app/produccion/servicios/produccion.service';
import Swal from 'sweetalert2';
import { VentasService } from '../../servicios/ventas.service';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.css']
})
export class ModifyComponent implements OnInit {
  dropDownList:any
  constructor(private router:Router, public servicioVentas:VentasService, public servicioProduccion:ProduccionService) { }
  isSubTable: boolean = false;

  faWrech = faWrench;
  faTrash = faTrash;

  @Input() detallesDeOrden: any ;
  arrayCarritoProductos: any[] = [];

  notasDescuento: any
  dataArraysSub:any = {}
  totalCarrito:number[] = [];

  descuentoTotal:number = 0;
  productoTotal:number = 0;


  boolVentanaEditCliente:boolean = false
  boolVentanaAgregarNotaDescuento:boolean = false
  boolVentanaEditarProductoMultiple:boolean = false
  boolVentanaBuscarProducto:boolean = false

  productoSeleccionadoIDEdit:number | string= 0;

  idORDEN:number = 0;

  ngOnInit(): void {

    console.log(this.detallesDeOrden)

    this.idORDEN = this.detallesDeOrden.id;

    this.arreglarOrden(this.detallesDeOrden.orden_detalle)

    this.calcularEltotal(this.detallesDeOrden.orden_detalle, this.detallesDeOrden.descuento);

    this.servicioVentas.actualizarOrdenTotalDescuento.subscribe(
      ()=> {
    this.calcularEltotal(this.detallesDeOrden.orden_detalle, this.detallesDeOrden.descuento);

      }
    )


  }
  viewSubTable(id:any){
  
    this.dataArraysSub[id] ? this.dataArraysSub[id] = false : this.dataArraysSub[id] = true;

  }

  calcularEltotal(array:any[], descuento:any[]){
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

    this.productoTotal = total;
    this.descuentoTotal = descuentos;

  }


  arreglarOrden(data: any[]) {
    console.log(data);
    data.map((x) => {
      if (
        this.arrayCarritoProductos.some((t) => t.id == x.productoVentas.id) == false
      ) {
        this.dataArraysSub[x.productoVentas.id] = false;
        this.arrayCarritoProductos.push({
          id: x.productoVentas.id,
          color:x.productoVentas.color,
          codigo: (  x.productoVentas.productoDetalles == null ? x.productoVentas.id : x.productoVentas.productoDetalles.producto.codigo),
          local: (  x.productoVentas.productoDetalles == null ? x.productoVentas.sub_local  : x.productoVentas.productoDetalles.local),
          modelo:
            x.productoVentas.sub_modelo == null
              ? x.productoVentas.productoDetalles.producto.modelo
              : x.productoVentas.sub_modelo,

        dibujo: x.productoVentas.sub_dibujo == null 
        ? (x.productoVentas.productoDetalles.producto.estampado == null ? '- - ':  x.productoVentas.productoDetalles.producto.estampado.dibujo)
        : x.productoVentas.sub_dibujo,

        precio: x.precio,
        talles:[
          {
            id: x.id,
            talle: x.talle,
            cantidad: x.cantidad,
       

          }
        ],
        });
      
        console.log(this.arrayCarritoProductos);
      } else {

        this.arrayCarritoProductos.find( l => l.id == x.productoVentas.id)
        .talles.push({
          id: x.id,
          talle: x.talle,
          cantidad: x.cantidad
        })
      }
    });


    this.arrayCarritoProductos.map(x => {
      //ordenar los talles 
      x.talles.sort(function(a:any, b:any) {
        return a.talle - b.talle;
      }
      );
    })
  }

  sumaDePrecioTotalDeUnProducto(producto:any[] ,precio:number):any {

    let sumaTotal = 0;
    let totalDeProductos = 0;
    let talles: any[]= [];
 
    producto.map(x => {
      totalDeProductos += x.cantidad;
      talles.push(x.talle);
    }
    )

    sumaTotal = precio * totalDeProductos ;
    
    talles.sort(function(a, b) {
      return a - b;
    });

    this.totalCarrito.push(sumaTotal)


    return [talles,totalDeProductos,sumaTotal];
  }

  IDoCodigoParaNota(id: number){
    

    if(this.detallesDeOrden.nota == null){
     
      return;

    }else{
      let data = this.detallesDeOrden.orden_detalle
      .find( (d:any )=> d.productoVentas.id == id)

  

      if(data != undefined){
        if(data.productoVentas.productoDetalles == null){
          return id
        }else{
          return data.productoVentas.productoDetalles.producto.codigo
        }
      }
  
  
    }
   
  }

  seleccionIDproducto(id:number | string){

    this.productoSeleccionadoIDEdit = id;
    console.log(id)
  }

  eliminarMultiplesProductos(id: number  | string){

    console.log(id)
    Swal.fire({
      title: 'Esta seguro que quiere eliminar este producto?',
      text: "Si lo hace, eliminara por completo el producto con ese CODIGO",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {

        this.servicioVentas.deleteUNProductoDeOrden( this.idORDEN, id).subscribe(
          (res:any) => {
            console.log(res)
            if(res.ok == true){
              Swal.fire(
                'Eliminado!',
                'El producto fue eliminado correctamente',
                'success'
              )
              this.arrayCarritoProductos.map ( (x, i) => {
                if(x.id == id){
                  this.arrayCarritoProductos.splice(i,1)
                }
              })


            }else{
              Swal.fire(
                'Error!',
                'No se pudo eliminar el producto',
                'error'
              )
            }
          }
        )
    
      }
    })
  }


  cancelarPedido(){
    Swal.fire({
      title: 'Esta seguro que quiere cancelar este pedido?',
      text: "Si lo hace, eliminara por completo el pedido",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.servicioVentas.deleteOrden( this.idORDEN).subscribe(
          (res:any) => {
            console.log(res)
            if(res.ok == true){
              Swal.fire(
                'Eliminado!',
                'El pedido fue eliminado correctamente',
                'success'
              )
            
            }else{
              Swal.fire(
                'Error!',
                'No se pudo eliminar el pedido',
                'error'
              )
            }
          })
      }
    })
  }


  eliminarNota(id: number  | string){
    Swal.fire({
      title: 'Esta seguro que quiere eliminar esta nota?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'SI'
    }).then((result) => {
      if (result.isConfirmed) {

        this.servicioVentas.deleteUNnotaDeOrden(id).subscribe(

          (res:any) => {
            console.log(res)
    
            if(res.ok == true){
              Swal.fire(
                'Eliminado!',
                'El descuento fue eliminado correctamente',
                'success'
              )

              this.detallesDeOrden.nota.map( (x:any, i:any) => {
                if(x.id == id){
                  this.detallesDeOrden.nota.splice(i,1)
                }
              })


              
              }else{
                Swal.fire(
                  'Error!',
                  'No se pudo eliminar el descuento',
                  'error'
                )
              }

            }
        )
     
      }
    })
  }

  eliminarDescuento(id: number  | string){

    console.log(id)
    Swal.fire({
      title: 'Esta seguro que quiere eliminar el descuento?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'SI'
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicioVentas.deleteUNDescuentoDeOrden(id).subscribe(

          (res:any) => {
            console.log(res)
    
            if(res.ok == true){
              Swal.fire(
                'Eliminado!',
                'El descuento fue eliminado correctamente',
                'success'
              )

              this.detallesDeOrden.descuento.map( (x:any, i:any) => {
                if(x.id == id){
                  this.detallesDeOrden.descuento.splice(i,1)
                }
              })
    this.calcularEltotal(this.detallesDeOrden.orden_detalle, this.detallesDeOrden.descuento);

              
              }else{
                Swal.fire(
                  'Error!',
                  'No se pudo eliminar el descuento',
                  'error'
                )
              }

            }
        )
      }
    })
  }


  imprimir(){
    this.servicioVentas.mandarParaImprimir = this.detallesDeOrden;
    this.router.navigate([`/invoice/${this.idORDEN}`]);

    


  }
}
