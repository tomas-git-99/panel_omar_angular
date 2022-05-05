import { Component, Input, OnInit } from '@angular/core';
import { faTruck } from '@fortawesome/free-solid-svg-icons';
import { IAgregarDistribucion } from 'src/app/produccion/interfaces/interface_produccion';
import { ProduccionService } from 'src/app/produccion/servicios/produccion.service';
import { VentasService } from 'src/app/ventas/servicios/ventas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-productos-produccion',
  templateUrl: './add-productos-produccion.component.html',
  styleUrls: ['./add-productos-produccion.component.css'],
})
export class AddProductosProduccionComponent implements OnInit {
  modal: boolean = false;

  ventanaDeAgregar: boolean = false;

  @Input() cerrarVenta!: boolean;
  modalBtn() {
    this.modal = !this.modal;
  }

  AlertaEstado: boolean = false;
  constructor(
    private servicioProduccion: ProduccionService,
    public servicioVentas: VentasService
  ) {}

  faTruck = faTruck;

  @Input() cantidad_actual!: number;

  cantidadParaEnviarAdd!: number;

  @Input() dataArrayDis: IAgregarDistribucion[] = [];
  @Input() seleccionDeHistorialDis: any;

  @Input() arrayDeHistorialProductos: any[] = [];

  arrayDeLocales: any;

  arrayDeUsuarios: any;

  ngOnInit(): void {
    this.seleccionDeHistorialDis.distribucion.map((element: any) => {
      let data = {
        id: element.id,
        local: element.local.id,
        talle: element.talle,
      };
      this.arrayDeHistorialProductos.push(data);
    });
    this.servicioProduccion.getObtenerUsuarios().subscribe((res: any) => {
      this.arrayDeUsuarios = res.data;
    });

    this.cantidad_actual = this.servicioProduccion.cantidadDistribucion$;

    this.servicioVentas.getObtenerLocales().subscribe((res: any) => {
      this.arrayDeLocales = res.data;
      console.log(this.arrayDeLocales);
    });

    this.servicioProduccion.cambiosCantidad$.subscribe((data) => {
      this.cantidad_actual = data;
      this.servicioProduccion.cantidadDistribucion$ = data;
    });

    this.servicioProduccion.cerrarAbrirVentanaDisAgregar$.subscribe((res) => {
      this.ventanaDeAgregar = res;
    });
  }

  viewDeDistribucion(array: any) {
    this.dataArrayDis = array;
  }
  cerrarVentanaFun() {
    if (this.dataArrayDis.length > 0) {
      this.AlertaEstado = true;
    } else {
      this.servicioProduccion.cerrarAbrirVentanaDistribucion$.emit(false);
    }
  }

  abrirYEnviarData() {}

  obtenerSoloElnombre(id: any) {
    if (this.arrayDeLocales !== undefined) {
      return this.arrayDeLocales.find((x: any) => x.id === parseInt(id)).nombre;
    }
  }
  enviarParaAgregarDis(id_usuario: any) {
    if (id_usuario.value == '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Seleccione por quien fue armado',
     
      })
      return;
    }

    this.servicioProduccion
      .postCrearDistribucion(
        this.servicioProduccion.IDProductoParaDistribucion,
        id_usuario.value,
        this.dataArrayDis
      )
      .subscribe((res: any) => {
        console.log(res);

        if (res.ok == true) {
          this.dataArrayDis = [];
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Se guardo correctamente',
            showConfirmButton: false,
            timer: 3500
          })


        } else {
          alert('Error al guardar');
        }
      });



  
  }

  actualizarVentana() {
    this.servicioProduccion.getObtenerDistribucionID(this.servicioProduccion.IDProductoParaDistribucion).subscribe(
      (res: any) => {

        if(res.ok == true){
          this.arrayDeHistorialProductos = [];
          res.data.distribucion.map((element: any) => {
            let data = {
              id: element.id,
              local: element.local.id,
              talle: element.talle,
            };
            this.arrayDeHistorialProductos.push(data);

            this.servicioProduccion.actualizarDataAlAgregar$.emit(res.data);
          })
  
    
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Actualize la pagina, si sigue el error',
          })
        }
  
    })
  }
}
