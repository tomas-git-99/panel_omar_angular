import { Component, Input, OnInit } from '@angular/core';
import { InfoProductos } from '../../inter/productosVentasTodos';
import { VentasService } from '../../servicios/ventas.service';

@Component({
  selector: 'app-sub-table',
  templateUrl: './sub-table.component.html',
  styleUrls: ['./sub-table.component.css']
})
export class SubTableComponent implements OnInit {
  dropDownList:any;

  isModify: boolean = false;

  isMenu: boolean = false;

  seleccionIDproducto!:number;

  @Input() isSubTable!: boolean ;

  @Input() arraySubProductos!:InfoProductos

  arrayPruebas:any[] = [1,2,3];

  constructor(public servicioVentas:VentasService) { }

  ngOnInit(): void {
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

  viewModify(id: number){
    //this.isModify = !this.isModify;
    this.seleccionIDproducto = id;

  }

}
