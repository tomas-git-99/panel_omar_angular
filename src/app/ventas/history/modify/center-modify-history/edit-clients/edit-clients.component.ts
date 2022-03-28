import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-clients',
  templateUrl: './edit-clients.component.html',
  styleUrls: ['./edit-clients.component.css']
})
export class EditClientsComponent implements OnInit {


  valueDeLabel:string = "";
  viewEditInput:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }


  valueEdit(data:any){


    
    this.valueDeLabel = data.value;

    this.viewEditInput = true;
  }
}
