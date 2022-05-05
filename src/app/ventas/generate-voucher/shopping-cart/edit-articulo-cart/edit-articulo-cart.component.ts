import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  faCircleInfo,
  faMinus,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { ProduccionService } from 'src/app/produccion/servicios/produccion.service';
import { VentasService } from 'src/app/ventas/servicios/ventas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-articulo-cart',
  templateUrl: './edit-articulo-cart.component.html',
  styleUrls: ['./edit-articulo-cart.component.css'],
})
export class EditArticuloCartComponent implements OnInit {
  faInfo = faCircleInfo;
  faPlus = faPlus;
  faMinus = faMinus;

  arrayPrueba = [
    {
      id: 1,
      cantidad: 20,
    },
    {
      id: 2,
      cantidad: 30,
    },
    {
      id: 3,
      cantidad: 40,
    },
    {
      id: 4,
      cantidad: 50,
    },
    {
      id: 5,
      cantidad: 60,
    },
    {
      id: 6,
      cantidad: 70,
    },
  ];

  @Input() arrayDeTallesYproductos!: any;
  @Output()
  abrirCerrarVentana = new EventEmitter<boolean>();

  numeroSeleccionado: number = 0;
  cantidadSeleccionada: number = 0;

  idCarrito!: number;
  constructor(
    public servicioProduccion: ProduccionService,
    public servicioVentas: VentasService
  ) {}

  ngOnInit(): void {
    console.log(this.arrayDeTallesYproductos);
  }

  eleccionar(numero: number) {
    this.idCarrito = numero;
    this.numeroSeleccionado = numero;

    this.arrayDeTallesYproductos.talles.map((x: any) => {
      if (x.id == numero) {
        this.cantidadSeleccionada = x.cantidad;
      }
    });
  }

  sumar() {
    this.cantidadSeleccionada += 1;
  }

  restar() {
    this.cantidadSeleccionada -= 1;
  }

  guardarCambios() {
    console.log(this.idCarrito);
    console.log(this.cantidadSeleccionada);

    this.servicioVentas.putEditarCarrito(this.idCarrito,{cantidad: this.cantidadSeleccionada}).subscribe((res:any) => {
      if (res.ok) {

        this.arrayDeTallesYproductos.talles.find( (p:any)=> p.id == this.idCarrito).cantidad = this.cantidadSeleccionada;

        Swal.fire('Guardado!', 'Se guardo correctamente', 'success');

      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo salio mal!',
        })
      }
    })
  }

  eliminarUnoDelCarriot(id: any) {
    Swal.fire({
      title: 'Estas seguro que quieres eliminar este producto?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'SI',
    }).then((result) => {
      if (result.isConfirmed) {
    this.servicioVentas.deleteCarritoSoloUno(id).subscribe((res:any) => {
      if (res.ok) {

        this.arrayDeTallesYproductos.talles.map( (f: any, index:any) => {
          if (f.id == id) {
            this.arrayDeTallesYproductos.talles.splice(index, 1);
          }
        })
        Swal.fire('Deleted!', 'Se elimino correctamente', 'success');

      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo salio mal!',
        })
      }
    });

      }
    });
  }
}
