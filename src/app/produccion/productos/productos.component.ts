import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  dropDownList:any;
  constructor() { }

  valueFilter:boolean = false;

  ngOnInit(): void {
  }


  viewFilter(){
    this.valueFilter = !this.valueFilter;
  }
}
