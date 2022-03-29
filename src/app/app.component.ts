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


    productosProduccion: '/assets/icon/camiseta.png',
    estampados:'/assets/icon/estampado.png',
    rollos:'/assets/icon/rollos.png',
    pagos:'/assets/icon/pagos.png',


  }

  routerLink = {
    inicio:       '/ventas/inicio',
    generar:      '/ventas/generar',
    historial:    '/ventas/historial',
    distribucion: '/ventas/distribucion',



    productos:              '/produccion/productos',
    estampados:             '/produccion/estampados',
    rollos:                 '/produccion/rollos',
    distribucionProduccion: '/produccion/distribucion',
    pagos:                  '/produccion/pagos',


  }

  sizeIconNav = '25px'

  changeValue(){
   
    this.isMenuVentas = !this.isMenuVentas ;
    this.isVentasOption = !this.isVentasOption;

  }

  isVentasOption: boolean = false;
  isProduccionOption: boolean = false;

  openVentas(){
    this.isVentasOption = !this.isVentasOption;
  }


  openProduccion(){
    this.isProduccionOption = !this.isProduccionOption;


  }
}
