import { Component, Input, OnInit, Output , EventEmitter} from '@angular/core';
import { Orden } from 'src/app/ventas/inter/ordenHistorial';


@Component({
  selector: 'app-edit-clients',
  templateUrl: './edit-clients.component.html',
  styleUrls: ['./edit-clients.component.css']
})
export class EditClientsComponent implements OnInit {


  valueDeLabel:string = "";
  viewEditInput:boolean = false;

  @Input()
  valueOrden!:Orden;

  @Output()
  cerrarVentana = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }


  valueEdit(data:any){

    this.valueDeLabel = data.value;

    this.viewEditInput = true;
  }


  editarDireccion( key:any, value:any){
    let dataDireccion:any = {
      llave:value.value
    }

    dataDireccion[key] = dataDireccion.llave;

    delete dataDireccion.llave;

    console.log(dataDireccion);
  }


  editarCliente( key:any, value:any){

    let dataCLiente:any = {
      llave:value.value
    }

    dataCLiente[key] = dataCLiente.llave;

    delete dataCLiente.llave;

    console.log(dataCLiente);
    
  }
}
