import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VentasService } from '../../servicios/ventas.service';

//import localidades  from '../../../../assets/json/localidades.json';
import { Localidades } from '../../inter/ventas';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})


export class CheckOutComponent implements OnInit {

  //_jsonURL:Localidades = localidades;
  descuentoTotal:number = 0;

  totalDeProducto:any ;

  formClienteDireccion!: FormGroup

  constructor(private router:Router, public servicioVentas:VentasService, private _builder: FormBuilder) { }

  ngOnInit(): void {


    this.formClienteDireccion = this._builder.group({
      cliente: this._builder.group({
        cliente:this._builder.group({
          nombre:['', Validators.required],
          apellido:['', Validators.required],
          email:['', Validators.required],
          telefono:['', Validators.required],
          dni_cuil:['', Validators.required],
        }),
        direccion:this._builder.group({
          direccion:['', Validators.required],
          localidad:['', Validators.required],
          cp:['', Validators.required],
          provincia:['', Validators.required],
        })
      })

    })


  
    this.totalDeProducto = localStorage.getItem('totalSoloProducto')
    JSON.parse(localStorage.getItem('descuentos') || '[]') === null 
    ? '' 
    : JSON.parse(localStorage.getItem('descuentos') || '[]').map((x:any) => this.descuentoTotal += parseInt(x.precio))  
    //console.log(this._jsonURL.localidades.filter( x => x.provincia.id == '06' && x.nombre == 'QUILMES'))
  }


  provinciasArray = {"provincias":[{"nombre_completo":"Provincia de Misiones","fuente":"IGN","iso_id":"AR-N","nombre":"Misiones","id":"54","categoria":"Provincia","iso_nombre":"Misiones","centroide":{"lat":-26.8753965086829,"lon":-54.6516966230371}},{"nombre_completo":"Provincia de San Luis","fuente":"IGN","iso_id":"AR-D","nombre":"San Luis","id":"74","categoria":"Provincia","iso_nombre":"San Luis","centroide":{"lat":-33.7577257449137,"lon":-66.0281298195836}},{"nombre_completo":"Provincia de San Juan","fuente":"IGN","iso_id":"AR-J","nombre":"San Juan","id":"70","categoria":"Provincia","iso_nombre":"San Juan","centroide":{"lat":-30.8653679979618,"lon":-68.8894908486844}},{"nombre_completo":"Provincia de Entre R??os","fuente":"IGN","iso_id":"AR-E","nombre":"Entre R??os","id":"30","categoria":"Provincia","iso_nombre":"Entre R??os","centroide":{"lat":-32.0588735436448,"lon":-59.2014475514635}},{"nombre_completo":"Provincia de Santa Cruz","fuente":"IGN","iso_id":"AR-Z","nombre":"Santa Cruz","id":"78","categoria":"Provincia","iso_nombre":"Santa Cruz","centroide":{"lat":-48.8154851827063,"lon":-69.9557621671973}},{"nombre_completo":"Provincia de R??o Negro","fuente":"IGN","iso_id":"AR-R","nombre":"R??o Negro","id":"62","categoria":"Provincia","iso_nombre":"R??o Negro","centroide":{"lat":-40.4057957178801,"lon":-67.229329893694}},{"nombre_completo":"Provincia del Chubut","fuente":"IGN","iso_id":"AR-U","nombre":"Chubut","id":"26","categoria":"Provincia","iso_nombre":"Chubut","centroide":{"lat":-43.7886233529878,"lon":-68.5267593943345}},{"nombre_completo":"Provincia de C??rdoba","fuente":"IGN","iso_id":"AR-X","nombre":"C??rdoba","id":"14","categoria":"Provincia","iso_nombre":"C??rdoba","centroide":{"lat":-32.142932663607,"lon":-63.8017532741662}},{"nombre_completo":"Provincia de Mendoza","fuente":"IGN","iso_id":"AR-M","nombre":"Mendoza","id":"50","categoria":"Provincia","iso_nombre":"Mendoza","centroide":{"lat":-34.6298873058957,"lon":-68.5831228183798}},{"nombre_completo":"Provincia de La Rioja","fuente":"IGN","iso_id":"AR-F","nombre":"La Rioja","id":"46","categoria":"Provincia","iso_nombre":"La Rioja","centroide":{"lat":-29.685776298315,"lon":-67.1817359694432}},{"nombre_completo":"Provincia de Catamarca","fuente":"IGN","iso_id":"AR-K","nombre":"Catamarca","id":"10","categoria":"Provincia","iso_nombre":"Catamarca","centroide":{"lat":-27.3358332810217,"lon":-66.9476824299928}},{"nombre_completo":"Provincia de La Pampa","fuente":"IGN","iso_id":"AR-L","nombre":"La Pampa","id":"42","categoria":"Provincia","iso_nombre":"La Pampa","centroide":{"lat":-37.1315537735949,"lon":-65.4466546606951}},{"nombre_completo":"Provincia de Santiago del Estero","fuente":"IGN","iso_id":"AR-G","nombre":"Santiago del Estero","id":"86","categoria":"Provincia","iso_nombre":"Santiago del Estero","centroide":{"lat":-27.7824116550944,"lon":-63.2523866568588}},{"nombre_completo":"Provincia de Corrientes","fuente":"IGN","iso_id":"AR-W","nombre":"Corrientes","id":"18","categoria":"Provincia","iso_nombre":"Corrientes","centroide":{"lat":-28.7743047046407,"lon":-57.8012191977913}},{"nombre_completo":"Provincia de Santa Fe","fuente":"IGN","iso_id":"AR-S","nombre":"Santa Fe","id":"82","categoria":"Provincia","iso_nombre":"Santa Fe","centroide":{"lat":-30.7069271588117,"lon":-60.9498369430241}},{"nombre_completo":"Provincia de Tucum??n","fuente":"IGN","iso_id":"AR-T","nombre":"Tucum??n","id":"90","categoria":"Provincia","iso_nombre":"Tucum??n","centroide":{"lat":-26.9478001830786,"lon":-65.3647579441481}},{"nombre_completo":"Provincia del Neuqu??n","fuente":"IGN","iso_id":"AR-Q","nombre":"Neuqu??n","id":"58","categoria":"Provincia","iso_nombre":"Neuqu??n","centroide":{"lat":-38.6417575824599,"lon":-70.1185705180601}},{"nombre_completo":"Provincia de Salta","fuente":"IGN","iso_id":"AR-A","nombre":"Salta","id":"66","categoria":"Provincia","iso_nombre":"Salta","centroide":{"lat":-24.2991344492002,"lon":-64.8144629600627}},{"nombre_completo":"Provincia del Chaco","fuente":"IGN","iso_id":"AR-H","nombre":"Chaco","id":"22","categoria":"Provincia","iso_nombre":"Chaco","centroide":{"lat":-26.3864309061226,"lon":-60.7658307438603}},{"nombre_completo":"Provincia de Formosa","fuente":"IGN","iso_id":"AR-P","nombre":"Formosa","id":"34","categoria":"Provincia","iso_nombre":"Formosa","centroide":{"lat":-24.894972594871,"lon":-59.9324405800872}},{"nombre_completo":"Provincia de Jujuy","fuente":"IGN","iso_id":"AR-Y","nombre":"Jujuy","id":"38","categoria":"Provincia","iso_nombre":"Jujuy","centroide":{"lat":-23.3200784211351,"lon":-65.7642522180337}},{"nombre_completo":"Ciudad Aut??noma de Buenos Aires","fuente":"IGN","iso_id":"AR-C","nombre":"Ciudad Aut??noma de Buenos Aires","id":"02","categoria":"Ciudad Aut??noma","iso_nombre":"Ciudad Aut??noma de Buenos Aires","centroide":{"lat":-34.6144934119689,"lon":-58.4458563545429}},{"nombre_completo":"Provincia de Buenos Aires","fuente":"IGN","iso_id":"AR-B","nombre":"Buenos Aires","id":"06","categoria":"Provincia","iso_nombre":"Buenos Aires","centroide":{"lat":-36.6769415180527,"lon":-60.5588319815719}},{"nombre_completo":"Provincia de Tierra del Fuego, Ant??rtida e Islas del Atl??ntico Sur","fuente":"IGN","iso_id":"AR-V","nombre":"Tierra del Fuego, Ant??rtida e Islas del Atl??ntico Sur","id":"94","categoria":"Provincia","iso_nombre":"Tierra del Fuego","centroide":{"lat":-82.52151781221,"lon":-50.7427486049785}}],"total":24,"cantidad":24,"parametros":{},"inicio":0}
  
  totalSUMA(descuentos:any, totalProductos:any ){

    return parseInt( totalProductos ) - parseInt( descuentos )  ;
  }

  volver(){
      
      this.router.navigate(['/generar']);
  
  }

  formCliente(value:any){

    if(value.cliente.cliente.nombre == '' ){


      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Al menos tiene llenar el campo de "Nombre"!',
      });
      return;
    }

    if(
      value.cliente.direccion.direccion == '' &&
      value.cliente.direccion.localidad == '' &&
      value.cliente.direccion.cp == '' &&
      value.cliente.direccion.provincia == ''

       ){

      value.cliente.direccion = null
    }


    localStorage.setItem('cliente', JSON.stringify(value));

    this.router.navigate(['/payment']);

   
  }
}
