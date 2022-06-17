import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Event, Router } from '@angular/router';
import { faFilter, faUser } from '@fortawesome/free-solid-svg-icons';
import { fromEvent } from 'rxjs';
import Swal from 'sweetalert2';
import { Usuario } from './interfaces/usuario';
import { ProduccionService } from './produccion/servicios/produccion.service';
import { ServicioService } from './servicio.service';
import { debounceTime } from 'rxjs/operators';
import { UsuariosNew } from './usuario/interface/usuarios';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  mostrartPanelUsuario: boolean = false;

  faUser = faUser;
  faFilter = faFilter;
  dataUsuario!: UsuariosNew;

  ventanaProduccion: boolean = false;
  ventanaVentas: boolean = false;

  constructor(
    public servicio: ServicioService,
    private router: Router,
    public servicioProduccion: ProduccionService,
    private cdRef: ChangeDetectorRef
  ) {



  }
  title = 'Milena';
  isList: number = 0;
  isMenu: boolean = false;
  isSearch: boolean = false;

  isMenuVentas: boolean = false;

  iconNav = {
    productos: '/assets/icon/productos.png',
    orden: '/assets/icon/orden.png',
    historial: '/assets/icon/history.png',
    distribution: '/assets/icon/camion.png',
    filtro: '/assets/icon/edits.png',

    productosProduccion: '/assets/icon/camiseta.png',
    estampados: '/assets/icon/estampado.png',
    rollos: '/assets/icon/rollos.png',
    pagos: '/assets/icon/pagos.png',
  };

  routerLink = {
    inicio: '/ventas/inicio',
    generar: '/ventas/generar',
    historial: '/ventas/historial',
    distribucion: '/ventas/distribucion',
    opciones: '/ventas/opciones',

    agregar: '/produccion/agregar',
    productos: '/produccion/productos',
    estampados: '/produccion/estampados',
    rollos: '/produccion/rollos',
    distribucionProduccion: '/produccion/distribucion',
    pagos: '/produccion/pago',

    usuarios: '/usuario',
  };

  ventanasProduccion: {
    id: number;
    nombre: string;
    img: any;
    estado: boolean;
    link: string;
  }[] = [
    {
      id: 6,
      nombre: 'Agregar/Opciones',
      img: this.iconNav.productosProduccion,
      estado: true,
      link: this.routerLink.agregar,
    },
    {
      id: 7,
      nombre: 'Productos/Articulos',
      img: this.iconNav.productosProduccion,
      estado: true,
      link: this.routerLink.productos,
    },

    {
      id: 8,
      nombre: 'Estampados',
      img: this.iconNav.estampados,
      estado: true,
      link: this.routerLink.estampados,
    },
    {
      id: 9,
      nombre: 'Distribucion produccion',
      img: this.iconNav.distribution,
      estado: true,
      link: this.routerLink.distribucionProduccion,
    },
    {
      id: 10,
      nombre: 'Pagos',
      img: this.iconNav.pagos,
      estado: true,
      link: this.routerLink.pagos,
    },
  ];

  ventanasVentas: {
    id: number;
    nombre: string;
    img: any;
    estado: boolean;
    link: string;
  }[] = [
    {
      id: 1,
      nombre: 'Productos',
      img: this.iconNav.productos,
      estado: true,
      link: this.routerLink.inicio,
    },
    {
      id: 2,
      nombre: 'Crear orden',
      img: this.iconNav.orden,
      estado: true,
      link: this.routerLink.generar,
    },
    {
      id: 3,
      nombre: 'Historial',
      img: this.iconNav.historial,
      estado: true,
      link: this.routerLink.historial,
    },
    {
      id: 4,
      nombre: 'Distribucion ventas',
      img: this.iconNav.distribution,
      estado: true,
      link: this.routerLink.distribucion,
    },
    {
      id: 5,
      nombre: 'Opciones',
      img: this.iconNav.filtro,
      estado: true,
      link: this.routerLink.opciones,
    },
  ];

  public estadoInternet: string = '';

  @Output()
  estadoDeInternet: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {

    
    this.servicio.abrirVentanasConPermisos();
  
    this.limintarVentanas();

      this.servicio.loginActivador.subscribe(() => {
      this.limintarVentanas();
    });

    fromEvent(window, 'offline')
      .pipe(debounceTime(100))
      .subscribe((event: any) => {
        //console.log(event);
        this.estadoInternet = event.type;
        this.estadoDeInternet.emit(this.estadoInternet);
      });
    fromEvent(window, 'online')
      .pipe(debounceTime(100))
      .subscribe((event: any) => {
        //console.log(event);
        this.estadoInternet = event.type;
        this.estadoDeInternet.emit(this.estadoInternet);
      });

    this.estadoDeInternet.subscribe((x) => {
      if (x == 'online') {
        setTimeout(() => {
          this.estadoInternet = '';
        }, 3000);
      }
    });



  }

  OnChanges() {
    console.log(this.estadoInternet);
  }

  ngAfterViewInit() {
 
  }

  
  
  sizeIconNav = '25px';

  salir() {
    this.isProduccionOption == true
      ? (this.isProduccionOption = !this.isProduccionOption)
      : '';
    this.isVentasOption == true
      ? (this.isVentasOption = !this.isVentasOption)
      : '';
  }

  changeValue(value: string) {
    //this.isMenuVentas = !this.isMenuVentas ;
    //this.isVentasOption = !this.isVentasOption;
    if (value == 'ventas') {
      this.isVentasOption = !this.isVentasOption;
    } else {
      this.isProduccionOption = !this.isProduccionOption;
    }
  }

  isVentasOption: boolean = false;
  isProduccionOption: boolean = false;

  openVentas() {
    this.isProduccionOption == true
      ? (this.isProduccionOption = !this.isProduccionOption)
      : '';
    this.isVentasOption = !this.isVentasOption;
  }

  openProduccion() {
    this.isVentasOption == true
      ? (this.isVentasOption = !this.isVentasOption)
      : '';
    this.isProduccionOption = !this.isProduccionOption;
  }

  cerrarLogin() {
    Swal.fire({
      title: 'Estas segura que quieres salir?',

      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Salir!',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('dataUsuario');
        this.router.navigate(['']);
        return;
      }
    });
  }



  limintarVentanas() {
    this.dataUsuario = JSON.parse(localStorage.getItem('dataUsuario') as any);
    //console.log(this.dataUsuario.roles)

    if(this.dataUsuario != null){
      if (this.dataUsuario.roles == 'admin') {
        this.ventanasProduccion.forEach((element) => {
          element.estado = true;
        });
        this.ventanasVentas.forEach((element) => {
          element.estado = true;
        });
      }
  
      if (this.dataUsuario.permisos.permisosVentanas.length > 0) {
        if (this.dataUsuario.roles == 'ventas') {
          this.ventanasVentas.forEach((element) => {
            this.dataUsuario.permisos.permisosVentanas.forEach((element2) => {
              if (element.id == element2.id_ventana) {
                element.estado = false;
              }
            });
          });
        }
  
        if (this.dataUsuario.roles == 'produccion') {
          this.ventanasProduccion.forEach((element) => {
            this.dataUsuario.permisos.permisosVentanas.forEach((element2) => {
              if (element.id == element2.id_ventana) {
                element.estado = false;
              }
            });
          });
        }
      }
    }

   
  }
}
