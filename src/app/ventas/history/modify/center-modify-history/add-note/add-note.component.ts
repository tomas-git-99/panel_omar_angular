import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Orden } from 'src/app/ventas/inter/ordenHistorial';
import { VentasService } from 'src/app/ventas/servicios/ventas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css'],
})
export class AddNoteComponent implements OnInit {
  @Input()
  arrayOrden!: Orden;

  @Input()
  productoNoRepetidos: any;

  @Input()
  idOrdenSeleccion: number = 0;

  @Output()
  cerrarVentana: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public servicioVentas: VentasService) {}

  ngOnInit(): void {
    console.log(this.arrayOrden);
    console.log(this.productoNoRepetidos);
  }
  isOpenedList: any;
  openMenu(source: any) {
    this.isOpenedList = source;
  }
  closeMenu() {
    this.isOpenedList = -1;
  }

  addNote(note: string, id_producto: number | string) {
    console.log(this.arrayOrden);

    if (id_producto == '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Seleccione un producto',
      });
      return;
    }

    if (
      this.arrayOrden.nota.length > 0 &&
      this.arrayOrden.nota.some((x) => x.producto_ventas.id == id_producto) ==
        true
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Este producto ya tiene nota',
      });
      return;
    }

    if (note == '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese una nota',
      });
      return;
    }

    console.log(note);
    console.log(id_producto);

    this.servicioVentas
      .postAgregarNotas(this.idOrdenSeleccion, id_producto, { nota: note })
      .subscribe((res: any) => {
        console.log(res);
        if (res.ok === true) {
          Swal.fire({
            icon: 'success',
            title: 'Exito',
            text: 'Nota agregada',
          });
          this.arrayOrden.nota.push({
            id: res.data.id,
            nota: note,
            producto_ventas: this.arrayOrden.orden_detalle.find(
              (x) => x.productoVentas.id == id_producto
            )?.productoVentas as any,
          });


        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error al agregar nota',
          });
        }
      });
  }

  addDescuento(motivo: string, precio: any ) {
    console.log(motivo);
    console.log(precio);

    if (precio == '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese un precio',
      });
      return;
    }


    this.servicioVentas.postAgregarDescuentos(this.idOrdenSeleccion, {precio: precio, motivo: motivo})
    .subscribe(
      (res:any) => {
        if (res.ok === true) {
          Swal.fire({
            icon: 'success',
            title: 'Exito',
            text: 'Descuento agregado',
          });
          this.arrayOrden.descuento.push({
            id: res.data.id,
            motivo: motivo,
            precio: precio
          })

          this.servicioVentas.actualizarOrdenTotalDescuento.emit(true)
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error al agregar descuento',
          });
        }
      }
    )
  }
}
