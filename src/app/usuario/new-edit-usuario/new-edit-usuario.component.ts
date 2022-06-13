import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { faFill, faFilter } from '@fortawesome/free-solid-svg-icons';
import { Usuario } from 'src/app/interfaces/usuario';
import Swal from 'sweetalert2';
import { UsuariosNew, PermisosLocales,  PermisosVentanas} from '../interface/usuarios';


@Component({
  selector: 'app-new-edit-usuario',
  templateUrl: './new-edit-usuario.component.html',
  styleUrls: ['./new-edit-usuario.component.css'],
  host: {
    '(document:click)': 'onClick($event)',
  },
})
export class NewEditUsuarioComponent implements OnInit {
  faFillter = faFilter;

  iconNav = {
    productos: '/assets/icon/productos.png',
    orden: '/assets/icon/orden.png',
    historial: '/assets/icon/history.png',
    distribution: '/assets/icon/camion.png',
    filtro: this.faFillter,

    productosProduccion: '/assets/icon/camiseta.png',
    estampados: '/assets/icon/estampado.png',
    rollos: '/assets/icon/rollos.png',
    pagos: '/assets/icon/pagos.png',
  };


  permisoDeLocales: boolean = false;
  permisoDeVentanas: boolean = false;

  cambiarPassword: boolean = false;
  cambiarNombreUsuario: boolean = false;

  ventanasProduccion: { id: number; nombre: string; img: any }[] = [
    { id: 6, nombre: 'Agregar/Opciones', img: this.iconNav.productosProduccion },
    { id: 7, nombre: 'Productos/Articulos', img: this.iconNav.productosProduccion },
    { id: 8, nombre: 'Estampados', img: this.iconNav.estampados },
    { id: 9, nombre: 'Distribucion produccion', img: this.iconNav.distribution },
    { id: 10, nombre: 'Pagos', img: this.iconNav.pagos },
  ];

  ventanasVentas:{ id: number; nombre: string; img: any }[] = [
    { id: 1, nombre: 'Productos', img: this.iconNav.productos },
    { id: 2, nombre: 'Crear orden', img: this.iconNav.orden },
    { id: 3, nombre: 'Historial', img: this.iconNav.historial},
    { id: 4, nombre: 'Distribucion ventas', img: this.iconNav.distribution},
    { id: 5, nombre: 'Opciones', img: this.iconNav.filtro },
  ];


  seleccionDeVentan:number = 0;
 

  agregarVentana: boolean = false;

  agregarNuevoLocal:boolean = false;
  agregarNuevaVentana:boolean = false;



  @Output()
  cerrarVentana: EventEmitter<boolean> = new EventEmitter<boolean>();


  @Input()
  UsuarioSeleccionado!:UsuariosNew;


  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    console.log(this.UsuarioSeleccionado);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    let keyPressed = event.keyCode;
    if (keyPressed === 27) {
      console.log('Escape!');
    }
  }
  @HostListener('document:click', ['$event', '$event.target'])
  clickBodyExit(event: MouseEvent, targetElement: HTMLElement) {
    if (targetElement.id == 'contenido') {
      console.log('sali perrito');
    }
  }

  cambiarNombreOUsuario(nombre: string, usuario: string) {
    console.log("nombre: " + nombre, "usuario: " + usuario);

    if (nombre == '' && usuario == '') {
      return
    }
  }

  FunCambiarPassword(passwordUno:string, passwordDos:string) {
    if(passwordUno == '' || passwordDos == ''){

      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'No se puede dejar los espacios vacios!',
      })
      return
    }

    if( passwordUno !== passwordDos){
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'La contraseña tiene que ser iguales!',
      })
      return
    }
  }

  seleccionarVentana(id:number){
    if(id == this.seleccionDeVentan){
      this.seleccionDeVentan = 0;
  
    }else{
      this.seleccionDeVentan = id;
      this.agregarVentana = !this.agregarVentana;

    }
  }


  imagenSeleccionada:string = ''
  nombreDeLoSeleccionado(opciones:string):any{
 
    if(opciones == "produccion"){

      this.imagenSeleccionada = this.ventanasProduccion.find(x => x.id == this.seleccionDeVentan)?.img;
      return  this.ventanasProduccion.find(x => x.id == this.seleccionDeVentan)?.nombre  ;
    }
    if(opciones ==  "ventas"){
      this.imagenSeleccionada = this.ventanasProduccion.find(x => x.id == this.seleccionDeVentan)?.img;

      return this.ventanasVentas.find(x => x.id == this.seleccionDeVentan)?.nombre  ;
    }
  }

  agregarNuevaVentanaPermiso(){
    console.log(this.seleccionDeVentan)
    if(this.seleccionDeVentan === 0){
      return
    }
    
  }

/* 
  get arrayNull(arrayPermisos: PermisosLocales | PermisosVentanas):PermisosLocales | PermisosVentanas | []{

    let array:[]=[]
    if(arrayPermisos == null){

      return array

    }else{

      return arrayPermisos

    }
  } */



}
