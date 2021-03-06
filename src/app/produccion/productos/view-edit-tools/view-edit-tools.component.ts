import { Component, Input, OnInit } from '@angular/core';
import {
  faCheck,
  faCoffee,
  faTruck,
  faWarning,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { IProductosData } from '../../interfaces/interface_produccion';
import { ProduccionService } from '../../servicios/produccion.service';

@Component({
  selector: 'app-view-edit-tools',
  templateUrl: './view-edit-tools.component.html',
  styleUrls: ['./view-edit-tools.component.css'],
})
export class ViewEditToolsComponent implements OnInit {
  faTruck = faTruck;
  faExit = faXmark;
  faCheck = faCheck;
  faWarning = faWarning;

  @Input() dataP!: any;
  //@Input() dataP!:IProductosData;
  @Input() cerrarVentana!: boolean;

  arrayTaller: any;

  arrayModificadores: any = {
    codigo: false,
    modelo: false,
    fecha_de_corte: false,
    edad: false,
    rollos: false,
    tela: false,
    peso_promedio: false,
    total_por_talle: false,
    talles: false,
    total: false,
    fecha_de_pago: false,
    cantidad_entregada: false,
    fecha_de_salida: false,
    fecha_de_entrada: false,
    estado_pago: false,

    taller: false,
  };

  arrayBotonCarga: any = {
    codigo: true,
    modelo: true,
    fecha_de_corte: true,
    edad: true,
    rollos: true,
    tela: true,
    peso_promedio: true,
    total_por_talle: true,
    talles: true,
    total: true,
    fecha_de_pago: true,
    cantidad_entregada: true,
    fecha_de_salida: true,
    fecha_de_entrada: true,
    estado_pago: true,

    taller: true,
  };

  ventaDeAdvertencia:boolean = false


  constructor(public servicioProduccion: ProduccionService) {}

  ngOnInit(): void {
    console.log(this.dataP);

    this.verificarSiEstaCompleto()
    
    this.servicioProduccion.getTaller().subscribe((res) => {
      console.log(res);
      this.arrayTaller = res.data;
    });
  }

  salirVentana() {
    this.servicioProduccion.cerrarAbrirVentana$.emit(false);
  }

  abrirModificador(nombreVentana: string) {
    console.log(nombreVentana);
    this.arrayModificadores[`${nombreVentana}`] =
      !this.arrayModificadores[`${nombreVentana}`];

    if (this.arrayBotonCarga[`${nombreVentana}`] == false) {
      this.arrayBotonCarga[`${nombreVentana}`] =
        !this.arrayBotonCarga[`${nombreVentana}`];
    }
  }


  enviarDato(nombre: string, valor: string) {
    let formData: any = {};

    formData[`${nombre}`] = valor == '' ? null : valor;
    this.arrayBotonCarga[`${nombre}`] = !this.arrayBotonCarga[`${nombre}`];

    this.servicioProduccion
      .putProductosEditar(this.dataP.id, formData)
      .subscribe((res) => {
        console.log(res);
        if (res.ok == true) {
          this.dataP[`${nombre}`] = valor;

          if (nombre == 'taller') {
            this.dataP[`${nombre}`] = {
              nombre_completo: this.arrayTaller.find((i: any) => i.id == valor)
                .nombre_completo,
            };
          } else if (nombre == 'total_por_talle' || nombre == 'talles') {
            nombre == 'total_por_talle'
              ? (this.dataP[`total`] =
                  parseInt(this.dataP[`talles`]) * parseInt(valor))
              : (this.dataP[`total`] =
                  parseInt(valor) * parseInt(this.dataP[`total_por_talle`]));
          }

        
          this.arrayBotonCarga[`${nombre}`] =
            !this.arrayBotonCarga[`${nombre}`];


            this.verificarSiEstaCompleto()
          Swal.fire('OK!', 'Se ha actualizado el producto', 'success');
        } else if (res.ok == false) {
          this.arrayBotonCarga[`${nombre}`] =
            !this.arrayBotonCarga[`${nombre}`];

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: res.message,
          });
        }
      });
  }

  enviarDistribucion() {
    this.servicioProduccion
      .putProductosEditar(this.dataP.id, {
        enviar_distribucion:
          this.dataP.enviar_distribucion == false ||
          this.dataP.enviar_distribucio == 'false'
            ? true
            : false,
      })
      .subscribe((res) => {
        if (res.ok == true) {
          this.dataP.enviar_distribucion =
            this.dataP.enviar_distribucion == false ||
            this.dataP.enviar_distribucio == 'false'
              ? true
              : false;
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo sali?? mal!',
          });
        }
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo sali?? mal!',
          });
        };
      });
  }

  /*   funcVentaView(nombre:string){
    console.log(nombre);
    this.arrayModificadores[`${nombre}`] = !this.arrayModificadores[`${nombre}`];

  } */

  verificarSiEstaCompleto(){

    if(this.dataP.fecha_de_entrada != null && this.dataP.cantidad_entregada == null){
      this.ventaDeAdvertencia = true;
    }

    if(this.dataP.fecha_de_entrada != null && this.dataP.cantidad_entregada != null){
      this.ventaDeAdvertencia = false;

    }


  }
}
