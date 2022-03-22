import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sub-table',
  templateUrl: './sub-table.component.html',
  styleUrls: ['./sub-table.component.css']
})
export class SubTableComponent implements OnInit {
  dropDownList:any;


  isMenu: boolean = false;

  @Input() isSubTable: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }


  viewSubTable(){
    this.isSubTable = !this.isSubTable;
    
  }
}