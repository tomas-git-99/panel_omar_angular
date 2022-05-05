import { Component, Input, OnInit } from '@angular/core';
import { InfoProductos, ProductoVenta } from 'src/app/ventas/inter/productosVentasTodos';
import { VentasService } from 'src/app/ventas/servicios/ventas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modify-home',
  templateUrl: './modify-home.component.html',
  styleUrls: ['./modify-home.component.css']
})
export class ModifyHomeComponent implements OnInit {

  @Input() isModifySub: boolean = false;
  @Input() IDproducto!: number;
  @Input() ArrayDistribucion!: InfoProductos;

  constructor(public servicioVentas:VentasService) { }

  ngOnInit(): void {
  }


  exitModify(){
    //console.log(this.isModifySub)
    console.log(this.IDproducto)
    console.log(this.ArrayDistribucion)
    this.isModifySub = !this.isModifySub;
  }


  valorParaCambiar(value: string):any{

    let valor:string | number | null | undefined = '' ;

    


      if(value =='modelo'  ){
        valor = this.ArrayDistribucion.distribucion.find( x => x.id == this.IDproducto)?.productoVentas.sub_modelo  == null 
        ? this.ArrayDistribucion.modelo 
        : this.ArrayDistribucion.distribucion.find( x => x.id == this.IDproducto)?.productoVentas.sub_modelo
      }
      if(value == 'dibujo'){
        valor = this.ArrayDistribucion.distribucion.find( x => x.id == this.IDproducto)?.productoVentas.sub_dibujo == null 
        ? this.ArrayDistribucion.estampado.dibujo 
        : this.ArrayDistribucion.distribucion.find( x => x.id == this.IDproducto)?.productoVentas.sub_dibujo

      }
      
  
      
      if(value == 'color'){
        valor = this.ArrayDistribucion.distribucion.find( x => x.id == this.IDproducto)?.productoVentas.color
      }

      if(value == 'precio'){

        valor =  '$ '+ this.ArrayDistribucion.distribucion.find( x => x.id == this.IDproducto)?.productoVentas.precio
      }
    
    return valor

  }
  enviarCambios(valor: string | number, nombre: string){

    let data:any = {
      dato: valor,
    }

    

    if(nombre == 'modelo'){
    
      nombre = 'sub_modelo'
    }
    if(nombre == 'dibujo'){
      
        nombre = 'sub_dibujo'
    }

    data[`${nombre}`] = data['dato'];
    delete data.dato;

    let idProducto = this.ArrayDistribucion.distribucion.find( x => x.id == this.IDproducto)?.productoVentas.id 

    this.servicioVentas.putEditarProducto(idProducto ,data).subscribe(
      (res:any) => {
        if(res.ok == true){

          let data = this.ArrayDistribucion as any

          data.distribucion.find( (x:any)=> x.id == this.IDproducto)!.productoVentas[nombre]  = valor ;
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
            text: 'Algo salio mal!',
     
          })
        }
      }
      )

  }

  vaciarInput(){

  }

}
