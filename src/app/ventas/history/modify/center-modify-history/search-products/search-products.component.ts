import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProduccionService } from 'src/app/produccion/servicios/produccion.service';
import { VentasService } from 'src/app/ventas/servicios/ventas.service';
import Swal from 'sweetalert2';

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

  abrirOpcionesDeBuscador:boolean = false;

  @Input()
  productoYaEnLista:any;

  @Output()
  cerrarVentana:EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input()
  idORDENseleccionado:number = 0;

  constructor(public servicioVentas:VentasService, public servicioProduccion:ProduccionService) { }

  ngOnInit(): void {

    console.log(this.idORDENseleccionado)
    this.servicioVentas.getObtenerLocales().subscribe(
      (res)=>{
       
        this.arrayLocales = res.data;
      }
    )

    
  }

  onKey(valor:any, local:any){
    
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
      
        this.arrayProductos = res.data;
        console.log(this.arrayProductos)

        this.abrirOpcionesDeBuscador = !this.abrirOpcionesDeBuscador

      })
  }

  productoSeleccionado:any;

  abrirVentaDeAgregar:boolean = false;

  cargaBoton:boolean = false;

  abrirProducto(id: number | string){
  

  this.productoSeleccionado = this.arrayProductos.find( (x:any) => x.id === id);
  // orden por talles this.productoSeleccionado.talles_ventas
  this.productoSeleccionado.talles_ventas.sort((a:any, b:any) => {
    return a.talles - b.talles;})

  
  this.abrirOpcionesDeBuscador = !this.abrirOpcionesDeBuscador
  this.abrirVentaDeAgregar = true;
  }


  valueCambiar:any = '';

  stockFalse:boolean = false;

  tallerSeleccionado:any;

  totalCurva(valor:any){
    this.valueCambiar = valor.value;    
  }
  agregarProducto(precioNuevo:any):any{


  /*   for( let y of   this.productoYaEnLista) {
      if(y.id == this.productoSeleccionado.id){
        
        return  Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Este producto ya lo tienes!' + y.modelo + " " + y.dibujo,
        })



        
      }     
    } */

 
    let tallesRepetido:any = [];

  let data:any = [];

    for (let x of this.productoSeleccionado.talles_ventas){
      let tallID = document.getElementById( `${x.id}`) as HTMLInputElement;

      if( parseInt(tallID.value) > x.cantidad ){


        this.stockFalse = true;
        this.tallerSeleccionado = x.talles

        //time volver a false stockFalse en 5 segundos
        setTimeout(() => {
          this.stockFalse = false;
          
        }
        , 6000);

        return;
      }


      if(tallID.value != ''){
        data.push({
          talle: parseInt(x.talles),
          cantidad: parseInt(tallID.value)
        })

     
       
      }
    }

    let codigo:any;


    for( let y of   this.productoYaEnLista) {
      if(y.id == this.productoSeleccionado.id){
        codigo = y.codigo;

        y.talles.map( (x:any )=> {

          let repetido = data.find( (l:any) => l.talle == x.talle)  
          
          if(repetido != undefined){
            tallesRepetido.push('Talle: ' + x.talle )
          }
        
        })
        
      }     

    }



    
    if(tallesRepetido.length > 0){
      return  Swal.fire({
        icon: 'warning',
        title: 'Este producto ya lo tienes! Codigo: ' + codigo,
        text: tallesRepetido.join('\n') + ' Si quieres agregar mas cantidad de estas talles, puedes hacerlo en EDITAR ',
      })
    }

      
 


    let datos = {
      id_producto: this.productoSeleccionado.id,
      precio_nuevo: precioNuevo == '' ? 0 :parseInt(precioNuevo),
      talles:data
    }


    

    console.log(datos)

    this.servicioVentas.postAgregarNuevoArticuloOrden(this.idORDENseleccionado, datos).subscribe(
      (res:any)=>{
        console.log(res)
        if(res.ok == true){
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '',
            showConfirmButton: false,
            timer: 1500
          })
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo salió mal!',

          })
        }
      }
    )
  
  }
}
