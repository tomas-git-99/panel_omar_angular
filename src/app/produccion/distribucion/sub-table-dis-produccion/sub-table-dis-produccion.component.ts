import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sub-table-dis-produccion',
  templateUrl: './sub-table-dis-produccion.component.html',
  styleUrls: ['./sub-table-dis-produccion.component.css']
})
export class SubTableDisProduccionComponent implements OnInit {

  constructor() { }

  @Input() isSubTableFailures: boolean = false;
  @Input() dataArrays:any;

  ngOnInit(): void {
    console.log(this.dataArrays)
  }
  viewSubTableFailures(){
    this.isSubTableFailures = !this.isSubTableFailures;
  }
}
