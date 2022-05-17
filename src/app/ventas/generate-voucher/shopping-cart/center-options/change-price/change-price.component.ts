import { Component, Input, OnInit } from '@angular/core';
import { VentasService } from 'src/app/ventas/servicios/ventas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-price',
  templateUrl: './change-price.component.html',
  styleUrls: ['./change-price.component.css']
})
export class ChangePriceComponent implements OnInit {

  @Input() changePrecioSub: boolean = false;

  @Input() arrayCarritoProductosHijo:any

  constructor(public servicioVentas: VentasService) { }

  ngOnInit(): void {

    console.log(this.arrayCarritoProductosHijo)
 
  }
  isOpenedList:any;
  openMenu(source:any) {
      this.isOpenedList = source;
  }
  closeMenu() {
      this.isOpenedList = -1;
  }


  closeView() {
    
    this.changePrecioSub = !this.changePrecioSub;
  }

  cambiarPrecio(id_producto:number | string,precio:number | string){
    console.log(id_producto,precio)

    const id_usuario = localStorage.getItem('id_usuario')

    this.servicioVentas.putCambiarPrecioCarrito(id_usuario, id_producto, {precio_nuevo:precio})
    .subscribe(
      (res:any) => {
        if(res.ok == true){
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '',
            showConfirmButton: false,
            timer: 1500
          })

          this.arrayCarritoProductosHijo.map( 
            (y:any)=> {
              if(y.id == id_producto){
                y.precio = precio
              }
            }
          )
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
