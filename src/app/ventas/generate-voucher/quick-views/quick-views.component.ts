import { Component, Input, OnInit } from '@angular/core';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { VentasService } from '../../servicios/ventas.service';
import { Datum } from '../../inter/ventas';
import { Carrito } from '../../inter/carrito';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/interfaces/usuario';
@Component({
  selector: 'app-quick-views',
  templateUrl: './quick-views.component.html',
  styleUrls: ['./quick-views.component.css'],
})
export class QuickViewsComponent implements OnInit {
  faCart = faCartShopping;
  FormularioProductos!: FormGroup | any;

  valorTodosInput: string = '';

  dataProducto!: Datum;
  @Input() id_producto: number = 0;

  

  constructor(
    private _builder: FormBuilder,
    public servicioVentas: VentasService
  ) {}

  ngOnInit(): void {
    this.FormularioProductos = this._builder.group({
      talles: this._builder.array([]),
    });

    this.servicioVentas.arrayDeProductoCarrito$.subscribe((x: Datum) => {


      this.dataProducto = x;

    

      x.talles_ventas.map((p) => {
        const control = <FormArray>this.FormularioProductos.get('talles');
        control.push(
          this._builder.group({
            talle: [p.talles, Validators.required],
            cantidad: ['', Validators.required],
          })
        );
      });
    });

  }

  onKeyUp(event: any) {
    this.valorTodosInput = event.target.value;
  }

  formProducto(data: {
    talles: [{ talle: number; cantidad: any }];
  }) {
   /*  let limpiarTalles: any[] = [];

    data.talles.map((x) => {
      console.log(x.cantidad);
      if (x.cantidad > 0 || x.cantidad != '' || x.cantidad != null) {
        limpiarTalles.push({ talle: x.talle, cantidad: x.cantidad });
      }
    });
 */
    data.talles.map((x, index) => {

      if (x.cantidad == 0 || x.cantidad == '' || x.cantidad == null) {
        //eliminar del array
        data.talles.splice(index, 1);
      }
    });

    let dataUsuarioLocal:Usuario = JSON.parse(localStorage.getItem('dataUsuario') as any);


    //console.log(  data.talles);
    
    this.servicioVentas.postAgregarCarrito( dataUsuarioLocal.id , this.id_producto,{data:data.talles}).subscribe( 
      (x:any)=> {
        console.log(x);
        if(x.ok == true){
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '',
            showConfirmButton: false,
            timer: 1500
          })


          this.dataProducto.talles_ventas.map((p) => {
            data.talles.map((t) => {
              if (p.talles === t.talle) {
                p.cantidad -= parseInt(t.cantidad);
              }
            })
          })

        /*   this.FormularioProductos.controls['talles'].controls.map((x:any) => {
            x.value.cantidad = ''
          }) */
        }else{
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'No ahi stock suficiente',
            text: x.productoSinStock,

            showConfirmButton: true,

          })
        }
      }, (error) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Algo salio mal',
          text: error.error.message,

          showConfirmButton: true,

        })
      }
      )

    
  }

  clearFormArray() {
    this.valorTodosInput = '';
    const control = <FormArray>this.FormularioProductos.get('talles');

    while (control.length !== 0) {
      control.removeAt(0);
    }
  }
}
