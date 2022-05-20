import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faFilter, faUser } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { ProduccionService } from './produccion/servicios/produccion.service';
import { ServicioService } from './servicio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  mostrartPanelUsuario:boolean = false;

  faUser = faUser;
  faFilter = faFilter;
  nombreUsuario:string | null = "";

  ventanaProduccion:boolean = false;
  ventanaVentas:boolean = false;

  constructor(public servicio:ServicioService, private router:Router, public servicioProduccion:ProduccionService){

    this.nombreUsuario = localStorage.getItem('usuario')

    localStorage.getItem('rol') === 'admin'
    ? this.mostrartPanelUsuario = true
    : this.mostrartPanelUsuario = false;


    if(localStorage.getItem('rol') == 'ventas'){
      this.ventanaVentas = true;
    }else if (localStorage.getItem('rol') == 'produccion'){
      this.ventanaProduccion = true;
    }else if (localStorage.getItem('rol') == 'admin'){
      this.ventanaVentas = true;
      this.ventanaProduccion = true;
  
    }
  }
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
    opciones: '/ventas/opciones',


    agregar:              '/produccion/agregar',
    productos:              '/produccion/productos',
    estampados:             '/produccion/estampados',
    rollos:                 '/produccion/rollos',
    distribucionProduccion: '/produccion/distribucion',
    pagos:                  '/produccion/pago',


    usuarios: '/usuario',

  }

  ngOnInit(): void {

    this.servicioProduccion.actualizarPagina$.subscribe( () => {

      this.nombreUsuario = localStorage.getItem('usuario')
  
      localStorage.getItem('rol') === 'admin'
      ? this.mostrartPanelUsuario = true
      : this.mostrartPanelUsuario = false;
  
  
      if(localStorage.getItem('rol') == 'ventas'){
        this.ventanaVentas = true;
      }else if (localStorage.getItem('rol') == 'produccion'){
        this.ventanaProduccion = true;
      }else if (localStorage.getItem('rol') == 'admin'){
        this.ventanaVentas = true;
        this.ventanaProduccion = true;
    
      }
    })

  
  }


 

  sizeIconNav = '25px'

  salir(){
    this.isProduccionOption == true ? this.isProduccionOption = !this.isProduccionOption : '';
    this.isVentasOption == true ? this.isVentasOption = !this.isVentasOption : '';
    
  }

  changeValue(value:string){
   
    //this.isMenuVentas = !this.isMenuVentas ;
    //this.isVentasOption = !this.isVentasOption;
    if(value == "ventas"){
      this.isVentasOption = !this.isVentasOption;

    }else{
    this.isProduccionOption = !this.isProduccionOption;

    }
  }

  isVentasOption: boolean = false;
  isProduccionOption: boolean = false;

  openVentas(){

    this.isProduccionOption == true ? this.isProduccionOption = !this.isProduccionOption : '';
    this.isVentasOption = !this.isVentasOption;

  }


  openProduccion(){
    this.isVentasOption == true ? this.isVentasOption = !this.isVentasOption : '';
    this.isProduccionOption = !this.isProduccionOption;


  }

  cerrarLogin(){
    Swal.fire({
      title: 'Estas segura que quieres salir?',
    
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Salir!'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('id_usuario');
        localStorage.removeItem('roles');
        localStorage.removeItem('local');
        localStorage.removeItem('id');
        this.router.navigate(['']);
        return;
      }
    })
  }
}
