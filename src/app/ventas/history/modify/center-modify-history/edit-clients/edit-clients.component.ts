import { Component, Input, OnInit, Output , EventEmitter} from '@angular/core';
import { Orden } from 'src/app/ventas/inter/ordenHistorial';
import { VentasService } from 'src/app/ventas/servicios/ventas.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-edit-clients',
  templateUrl: './edit-clients.component.html',
  styleUrls: ['./edit-clients.component.css']
})
export class EditClientsComponent implements OnInit {


  valueDeLabel:string = "";
  viewEditInput:boolean = false;

  @Input()
  valueOrden!:Orden | any;

  @Output()
  cerrarVentana = new EventEmitter<boolean>();


  estadoDeDireccion:boolean = false;


  BotonCarga:boolean = false;

  arrayLocales:any

  constructor(public servicioVentas:VentasService) { }

  ngOnInit(): void {
    console.log(this.valueOrden);

    if(this.valueOrden.cliente_direccion !== null){
      this.estadoDeDireccion = true;
    }


    this.servicioVentas.getObtenerLocales().subscribe( 
      (res:any) => {
        this.arrayLocales = res.data;
      }
    )
  }


  valueEdit(data:any){

    this.valueDeLabel = data.value;

    this.viewEditInput = true;
  }

  editOrdenEstadoPUT(key:any, value:any){

    console.log(key, value.value)

    if(value.value == ''){

      alert("Debe ingresar un valor");
      return;
    }


    let dataOrden:any = {
      [key]: value.value
    }

    if(key == 'pagado'){
      
      value.value == 'true' 
      ? dataOrden.pagado = true
      : dataOrden.pagado = false;
    }


  
    this.servicioVentas.putEditarOrdenEstado(this.valueOrden.ordenEstado.id ,dataOrden).subscribe
    (
      (res:any) => {

        console.log(res)
        if(res.ok == true){
          
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '',
            showConfirmButton: false,
            timer: 1500
          })

   

          if(key == 'pagado'){

            if(value.value == 'true'){
              this.valueOrden.ordenEstado[key] = value.value;
              this.valueOrden.ordenEstado.fecha_de_pago = new Date().toISOString().slice(0, 10) as any;
            }else{
              this.valueOrden.ordenEstado[key] = value.value;
              this.valueOrden.ordenEstado.fecha_de_pago = null;
            }
       

          }else if(key == 'armado'){
            this.valueOrden.ordenEstado[key] = this.arrayLocales.find(( x:any )=> x.id == value.value);

          }else{
            this.valueOrden.ordenEstado[key] = value.value;

          }

          this.BotonCarga = false;

 

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


  editarDireccion( key:any, value:any){
    let dataDireccion:any = {
      llave:value.value
    }

    dataDireccion[key] = dataDireccion.llave;

    delete dataDireccion.llave;

    if(value.value === ""){

      alert("Debe ingresar un valor");
      return;
    }

    console.log(dataDireccion);

    this.servicioVentas.putEditarDireccion(this.valueOrden.cliente_direccion.id ,dataDireccion).subscribe
    (
      (res:any) => {
        if(res.ok == true){
          
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '',
            showConfirmButton: false,
            timer: 1500
          })

          this.valueOrden.cliente_direccion[key] = value.value;

          this.BotonCarga = false;

 

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


  editarCliente( key:any, value:any){

    let dataCLiente:any = {
      llave:value.value
    }

    dataCLiente[key] = dataCLiente.llave;

    delete dataCLiente.llave;

    if(value.value === ""){

      alert("Debe ingresar un valor");
      return;
    }

    console.log(dataCLiente);


    this.servicioVentas.putEditarCliente(this.valueOrden.cliente.id ,dataCLiente).subscribe
    (
      (res:any) => {
        if(res.ok == true){
          
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '',
            showConfirmButton: false,
            timer: 1500
          })

          this.valueOrden.cliente[key] = value.value;

          this.BotonCarga = false;

 

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
