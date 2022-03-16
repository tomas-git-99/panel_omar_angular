import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  nav:boolean=true;
  navBtn(){
    this.nav=!this.nav
  }
  isList: number = 0;
  isMenu: boolean = false;
  isSearch: boolean = false;
  

  dropDownList:any;
  constructor() { }

  ngOnInit(): void {
  }

}
