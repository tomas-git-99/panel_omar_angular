import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sub-tables-failures',
  templateUrl: './sub-tables-failures.component.html',
  styleUrls: ['./sub-tables-failures.component.css']
})
export class SubTablesFailuresComponent implements OnInit {

  constructor() { }


  @Input() isSubTableFailures: boolean = false;
  
  ngOnInit(): void {
  }

}
