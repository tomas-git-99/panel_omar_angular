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
    talles: [{ talle: number; cantidad: number | string }];
  }) {
    let limpiarTalles: any[] = [];

    data.talles.map((x) => {
      if (x.cantidad > 0 || x.cantidad !== '') {
        limpiarTalles.push({ talle: x.talle, cantidad: x.cantidad });
      }
    });

  
    
    this.servicioVentas.postAgregarCarrito( localStorage.getItem('id_usuario'),this.id_producto,{data:limpiarTalles}).subscribe( 
      (x:any)=> {
        if(x.ok === true){
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '',
            showConfirmButton: false,
            timer: 1500
          })

          this.FormularioProductos.reset();
          this.dataProducto.talles_ventas.map((p) => {
            limpiarTalles.map((t) => {
              if (p.talles === t.talle) {
                p.cantidad -= t.cantidad;
              }
            })
          })
        }else{
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'No ahi stock suficiente',
            text: x.productoSinStock,

            showConfirmButton: true,

          })
        }
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
