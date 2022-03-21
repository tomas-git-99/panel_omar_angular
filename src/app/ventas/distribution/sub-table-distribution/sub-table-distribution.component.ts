import { Component, Input, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }


  viewSubTable(){
    this.isSubTable = !this.isSubTable;
    
  }

  viewSubTableFailures(){
    this.isSubTableFailures
  }

}
