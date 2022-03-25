import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.css']
})
export class ModifyComponent implements OnInit {
  dropDownList:any
  constructor() { }
  isSubTable: boolean = false;

  ngOnInit(): void {
  }
  viewSubTable(){
    this.isSubTable = !this.isSubTable;
  }

}
