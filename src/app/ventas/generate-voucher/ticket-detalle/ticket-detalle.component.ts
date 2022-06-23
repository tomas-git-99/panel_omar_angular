import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VentasService } from '../../servicios/ventas.service';

import { Orden } from '../../inter/ordenHistorial';

@Component({
  selector: 'app-ticket-detalle',
  templateUrl: './ticket-detalle.component.html',
  styleUrls: ['./ticket-detalle.component.css'],
})
export class TicketDetalleComponent implements OnInit {
  dataDeOrden!: Orden;
  nuevoArrayConPro: any = [];

  constructor(public servicioVentas: VentasService, private router: Router) {}

  ngOnInit(): void {
    this.servicioVentas
      .getObtenerOrdenPorID(this.router.url.split('/')[2])
      .subscribe(
        (res) => {
          if (res.ok == true) {
            if (res.data == null) {
              this.router.navigate(['/ventas/historial']);
            }

            console.log(res);
            //console.log(res);
            this.dataDeOrden = res.data;
            this.arreglarOrden();
          } else {
            this.router.navigate(['/ventas/historial']);
          }
        },
        (error) => {
          this.router.navigate(['/ventas/historial']);
        }
      );
  }
  arreglarOrden() {
    this.dataDeOrden.orden_detalle.map((x: any) => {
      if (
        this.nuevoArrayConPro.some((t: any) => t.id == x.productoVentas.id) ==
        false
      ) {
        //this.dataArraysSub[x.productoVentas.id] = false;
        this.nuevoArrayConPro.push({
          id: x.productoVentas.id,
          color: x.productoVentas.color == null ? '' : x.productoVentas.color,
          tela:
            x.productoVentas.sub_tela == null
              ? x.productoVentas.productoDetalles == null
                ? ''
                : x.productoVentas.productoDetalles.producto.tela
              : x.productoVentas.sub_tela,
          codigo:
            x.productoVentas.productoDetalles == null
              ? x.productoVentas.id
              : x.productoVentas.productoDetalles.producto.codigo,
          local:
            x.productoVentas.productoDetalles == null
              ? ''
              : x.productoVentas.productoDetalles.local.nombre,
          modelo:
            x.productoVentas.sub_modelo == null
              ? x.productoVentas.productoDetalles.producto.modelo
              : x.productoVentas.sub_modelo,

          dibujo:
            x.productoVentas.sub_dibujo == null
              ? x.productoVentas.productoDetalles == null
                ? ''
                : x.productoVentas.productoDetalles.producto == null
                ? ''
                : x.productoVentas.productoDetalles.producto.estampado == null
                ? ''
                : x.productoVentas.productoDetalles.producto.estampado.dibujo
              : x.productoVentas.sub_dibujo,

          precio: x.precio,
          completo: false,
          talles: [
            {
              id: x.id,
              talle: x.talle,
              cantidad: x.cantidad,
              estado: false,
            },
          ],
        });

        console.log(this.nuevoArrayConPro);
      } else {
        this.nuevoArrayConPro
          .find((l: any) => l.id == x.productoVentas.id)
          .talles.push({
            id: x.id,
            talle: x.talle,
            cantidad: x.cantidad,
            estado: false,
          });
      }
    });
  }

  ordenarTalles(array: any[]) {
    let newarr = array.sort((a, b) => a.talle - b.talle);
    return newarr;
  }

  totalDelOrden(array: any[]) {
    let newarr = 0;
    array.map((a, b) => {
      newarr += a.cantidad;
    });

    return newarr;
  }

  funcionParaCompletados(array: any[]){

    let newarr:any = [];
    array.map(
      (x:any) => {
        if(x.completo == false){
          newarr.push(x)
        }
      }
    )

    array.map(
      (x:any) => {
        if(x.completo == true){
          newarr.push(x)

        }
      }
    )

    return newarr
  }

  cambiar(idProducto: any, id_talle: any) {
    this.nuevoArrayConPro
      .find((x: any) => x.id == idProducto)
      .talles.find((p: any) => {
        if (p.id == id_talle) {
          p.estado = !p.estado;
        }
      });

    let dataPrueba = this.nuevoArrayConPro.find((x: any) => x.id == idProducto);

    if (
      dataPrueba.talles.length ==
      dataPrueba.talles.filter((x: any) => x.estado == true).length
    ) {
      dataPrueba.completo = true;
    
    }else{
      dataPrueba.completo = false;
      
    }
  }



}
