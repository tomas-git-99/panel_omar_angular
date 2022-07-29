import { Component, Input, OnInit } from '@angular/core';
import { ProduccionService } from 'src/app/produccion/servicios/produccion.service';
import { VentasService } from '../../servicios/ventas.service';

@Component({
  selector: 'app-sub-table-distribution',
  templateUrl: './sub-table-distribution.component.html',
  styleUrls: ['./sub-table-distribution.component.css']
})
export class SubTableDistributionComponent implements OnInit {
  dropDownList:any;


  isMenu: boolean = false;

  @Input() isSubTable: boolean = false;
  @Input() isSubTableFailures: boolean = false;

  @Input() subTablaArray: any;

  ArraySubTalles: any[] = [];
  ArraySubTallesBool: boolean = false;

  constructor( public servicioVentas:VentasService,public servicioProduccion:ProduccionService) { }

  ngOnInit(): void {
    console.log(this.subTablaArray)
  }

  arrayTalles(arrays:any[]) {
    let arrayT:string[] = []

    arrays.map( 
      x => {
        arrayT.push(x.talles)
      }
    )
    return arrayT;
  }
  viewSubTable(){
    this.isSubTable = !this.isSubTable;
    
  }

  viewSubTableFailures(){
    this.isSubTableFailures = !this.isSubTableFailures;
  }

  agregarVentas(id:string){

    console.log(id)
    
    this.subTablaArray.distribucion.map( (e:any) => {
      if(e.id == id){
        this.ArraySubTalles = e;

        this.servicioVentas.agregarDisctribucionArray = e;
    
      }
    })
  }
}
