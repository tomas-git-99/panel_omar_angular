import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  isList: any;
  isMenu: boolean = false;
  isSearch: boolean = false;
  nav:boolean=true;
  navBtn(){
    console.log(this.nav);
    this.nav=!this.nav
  }

  
  constructor() { }

  ngOnInit(): void {
  }

}
