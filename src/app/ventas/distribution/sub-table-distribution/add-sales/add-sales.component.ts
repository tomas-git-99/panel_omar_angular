import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProduccionService } from 'src/app/produccion/servicios/produccion.service';
import { VentasService } from 'src/app/ventas/servicios/ventas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-sales',
  templateUrl: './add-sales.component.html',
  styleUrls: ['./add-sales.component.css'],
})
export class AddSalesComponent implements OnInit {
  
  @Input() dataArrayTalle: any;

  FormAgregarProductos!: FormGroup;

  arrayCategorias: any;

  modal: boolean = false;
  modalBtn() {
    this.modal = !this.modal;
  }
  isOpenedList: any;
  openMenu(source: any) {
    this.isOpenedList = source;
  }
  closeMenu() {
    this.isOpenedList = -1;
  }
  constructor(
    public servicioVentas: VentasService,
    private _builder: FormBuilder,
    public servicioProduccion: ProduccionService
  ) {
 
  }

  ngOnInit(): void {
    console.log(this.dataArrayTalle)

    this.servicioVentas.getObtenerCategorias().subscribe((res) => {
      this.arrayCategorias = res.data;
    });

    this.FormAgregarProductos = this._builder.group({
      precio: ['', Validators.required],
      color: ['', Validators.required],
      sub_modelo: ['', Validators.required],
      sub_dibujo: ['', Validators.required],
      categoria: ['', Validators.required],
    });
  
  }

  agregarProductosNuevos(values: {precio:number, color:string, sub_modelo:string | null, sub_dibujo:string | null, categoria:string | null}) {
    let cantidadTotal = this.servicioProduccion.funcConteoTotalDeCantidad(
      this.dataArrayTalle.talle
    );

    if(values.categoria == '')values.categoria = null ;
    if(values.sub_modelo == '')values.sub_modelo = null ;
    if(values.sub_dibujo == '')values.sub_dibujo = null ;
    
    if (cantidadTotal > 0) {
      this.servicioVentas
        .postCrearProductosParaVenta(this.dataArrayTalle.id, values)
        .subscribe((res: any) => {
          if (res.ok === true) {

            this.dataArrayTalle.talle.map((talle:any) => talle.cantidad_actual = 0);
            
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Producto agregado',
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Algo salio mal!',
            });
          }
        });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo salio mal!',
      });
    }
  }
}
