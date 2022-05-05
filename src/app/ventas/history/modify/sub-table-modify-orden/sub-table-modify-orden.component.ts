import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sub-table-modify-orden',
  templateUrl: './sub-table-modify-orden.component.html',
  styleUrls: ['./sub-table-modify-orden.component.css']
})
export class SubTableModifyOrdenComponent implements OnInit {

  @Input() isSubTable: boolean = false;
  @Input() arrayCarritoProductosHijo:any

  constructor() {
   }

  ngOnInit(): void {
    console.log(this.arrayCarritoProductosHijo)
    
  }

}
