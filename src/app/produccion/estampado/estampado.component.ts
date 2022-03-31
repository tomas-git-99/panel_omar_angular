import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estampado',
  templateUrl: './estampado.component.html',
  styleUrls: ['./estampado.component.css']
})
export class EstampadoComponent implements OnInit {

  dropDownList:any;
  constructor() { }

  valueFilter:boolean = false;

  ngOnInit(): void {
  }


  viewFilter(){
    this.valueFilter = !this.valueFilter;
  }
}
