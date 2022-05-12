import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ProduccionService } from 'src/app/produccion/servicios/produccion.service';
import Swal from 'sweetalert2';
import { VentasService } from '../../servicios/ventas.service';

@Component({
  selector: 'app-moficador-de-productos-beta',
  templateUrl: './moficador-de-productos-beta.component.html',
  styleUrls: ['./moficador-de-productos-beta.component.css']
})
export class MoficadorDeProductosBetaComponent implements OnInit {

  faPlus = faPlus;
  faMinus = faMinus;
  numeroSeleccionado: number = 0;
  cantidadSeleccionada: number = 0;



  @Input() productoSeleccionado: any;
  @Input() arrayDeCatergoria: any;
  @Input() arrayDeLocales: any;
  
  @Output() cerrarVentana = new EventEmitter();

  seleccionDetalles:any = {};
botonDeCargaTalles: boolean = false;
botonDeCargaGlobal: boolean = false;

formEditar!:FormGroup

BotonCarga:boolean = false;

  constructor(private _builder: FormBuilder, public servicioVentas:VentasService, public servicioProduccion:ProduccionService) { }

  ngOnInit(): void {

    this.formEditar = this._builder.group({
      sub_modelo:['', Validators.required],
      sub_dibujo: ['', Validators.required],
      color: ['', Validators.required],
      precio: ['', Validators.required],
      sub_local: ['', Validators.required],
      categoria: ['', Validators.required],
    })

    console.log(this.productoSeleccionado)
  }
  sumar() {
    this.cantidadSeleccionada += 1;
  }

  restar() {
    this.cantidadSeleccionada -= 1;
  }

  enviarModificacion(data: any) {
    console.log(data)

    Object.keys(data).map( (e:any) => {

      if (data[e] == '' || data[e] == null || data[e] == undefined) {
        delete data[e]
      }
    })


    console.log(data);

    this.servicioVentas.putEditarProducto(this.productoSeleccionado.id, data).subscribe(
      (res:any) => {
        if(res.ok == true){
          
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '',
            showConfirmButton: false,
            timer: 1500
          })

          this.BotonCarga = false;


          let datos = this.productoSeleccionado;

          Object.keys(data).map( (e:any) => {

            if(e == 'sub_local' || e == 'categoria'){

              e == 'categoria'
              ? datos[e] = this.arrayDeCatergoria.find( (x:any) => x.id == data[e])
              : datos[e] = this.arrayDeLocales.find( (x:any) => x.id == data[e]);

            }else{

              datos[e] = data[e]
            }
          })
      
          this.formEditar.reset();

        }else{
          this.BotonCarga = false;

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo salió mal!',

          })
        }
        (error:any) => {
          this.BotonCarga = false;

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo salió mal!',

          })
        }
      }
    )

    
  }


  onChangeLocal(event: any) {

    if(event.value == ''){
      this.seleccionDetalles = {}
    }else{
      this.seleccionDetalles = this.productoSeleccionado.talles_ventas.find((item:any) => item.id  == event.value)

      this.cantidadSeleccionada = this.seleccionDetalles.cantidad
    }
  }


  cambiar(){
    console.log(this.cantidadSeleccionada)


    console.log(this.seleccionDetalles.id)

    this.servicioVentas.putEditarTallesVentas(this.seleccionDetalles.id, {cantidad: this.cantidadSeleccionada}).subscribe(
      (res:any) => {
        if(res.ok == true){
          
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '',
            showConfirmButton: false,
            timer: 1500
          })

          this.BotonCarga = false;

          this.productoSeleccionado.talles_ventas.find((item:any) => item.id  == this.seleccionDetalles.id).cantidad = this.cantidadSeleccionada

        }else{
          this.BotonCarga = false;

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo salió mal!',

          })
        }
        (error:any) => {
          this.BotonCarga = false;

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
