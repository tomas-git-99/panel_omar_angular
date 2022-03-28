import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'panel-omar-new-angular';
  isList: number = 0;
  isMenu: boolean = false;
  isSearch: boolean = false;


  isMenuVentas:boolean = false;


  iconNav = {
    productos:'/assets/icon/productos.png',
    orden:'/assets/icon/orden.png',
    historial:'/assets/icon/history.png',
    distribution:'/assets/icon/camion.png',

  }

  routerLink = {
    inicio: '/',

    generar: '/generar',
    historial: '/historial',
    distribucion: '/distribucion',

  }

  sizeIconNav = '25px'

  changeValue(){
   
    this.isMenuVentas = !this.isMenuVentas ;
    this.isVentasOption = !this.isVentasOption;

  }

  isVentasOption: boolean = false;

  openVentas(){
    this.isVentasOption = !this.isVentasOption;
  }
}
