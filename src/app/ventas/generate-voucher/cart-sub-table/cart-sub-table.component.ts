import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-sub-table',
  templateUrl: './cart-sub-table.component.html',
  styleUrls: ['./cart-sub-table.component.css']
})
export class CartSubTableComponent implements OnInit {

  dropDownList:any;


  isMenu: boolean = false;

  @Input() isSubTable: boolean = false;
  @Input() arrayCarritoProductosHijo:any

  

  constructor() { }

  ngOnInit(): void {
    console.log(this.arrayCarritoProductosHijo)
  }


  viewSubTable(){
    this.isSubTable = !this.isSubTable;
    
  }

}
