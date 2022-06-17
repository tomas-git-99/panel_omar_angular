import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { faEye, faEyeSlash, faFill, faFilter } from '@fortawesome/free-solid-svg-icons';
import { Usuario } from 'src/app/interfaces/usuario';
import { ServicioService } from 'src/app/servicio.service';
import Swal from 'sweetalert2';
import {
  UsuariosNew,
  PermisosLocales,
  PermisosVentanas,
  Local,
} from '../interface/usuarios';

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


  faEye = faEye;
  faEyeBlind = faEyeSlash;


  botonViewPassword:boolean = true;
  botonViewPassword2:boolean = true;

  viewPassword:string = 'password';
  viewPassword2:string = 'password';

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

  permisoDeLocales: boolean = false;
  permisoDeVentanas: boolean = false;

  cambiarPassword: boolean = false;
  cambiarNombreUsuario: boolean = false;

  ventanasProduccion: { id: number; nombre: string; img: any }[] = [
    {
      id: 6,
      nombre: 'Agregar/Opciones',
      img: this.iconNav.productosProduccion,
    },
    {
      id: 7,
      nombre: 'Productos/Articulos',
      img: this.iconNav.productosProduccion,
    },
    { id: 8, nombre: 'Estampados', img: this.iconNav.estampados },
    {
      id: 9,
      nombre: 'Distribucion produccion',
      img: this.iconNav.distribution,
    },
    { id: 10, nombre: 'Pagos', img: this.iconNav.pagos },
  ];

  ventanasVentas: { id: number; nombre: string; img: any }[] = [
    { id: 1, nombre: 'Productos', img: this.iconNav.productos },
    { id: 2, nombre: 'Crear orden', img: this.iconNav.orden },
    { id: 3, nombre: 'Historial', img: this.iconNav.historial },
    { id: 4, nombre: 'Distribucion ventas', img: this.iconNav.distribution },
    { id: 5, nombre: 'Opciones', img: this.iconNav.filtro },
  ];

  seleccionDeVentan: number = 0;

  agregarVentana: boolean = false;

  agregarNuevoLocal: boolean = false;
  agregarNuevaVentana: boolean = false;

  @Output()
  cerrarVentana: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input()
  UsuarioSeleccionado!: UsuariosNew;

  @Input()
  dataLocales!: Local[];

  constructor(private elementRef: ElementRef, public servicio:ServicioService) {}

  ngOnInit(): void {
    console.log(this.UsuarioSeleccionado);
    console.log(this.dataLocales);
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
    console.log('nombre: ' + nombre, 'usuario: ' + usuario);


    let data:any = {}

    if (nombre == '' && usuario == '') {

      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'No se puede dejar campos vacios',
      });

      return;
    }

    if (nombre != '') {

      data['nombre'] = nombre;
    }

    if(usuario != ''){

      data['usuario'] = usuario;
    }

    this.servicio.putEditarUsuario( this.UsuarioSeleccionado.id, data)
    .subscribe(
      res => {
        if(res.ok == true){
          Swal.fire({
            icon: 'success',
            title: 'Exito',
            text: 'Se actualizo el usuario',
          });

          if(nombre != ''){
            this.UsuarioSeleccionado.nombre = nombre;
          }

          if(usuario != ''){
            this.UsuarioSeleccionado.usuario = usuario;
          }



        }else{

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se pudo actualizar el usuario',
          });
        }
      }
    )
  }

  FunCambiarPassword(passwordUno: string, passwordDos: string) {
    if (passwordUno == '' || passwordDos == '') {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'No se puede dejar los espacios vacios!',
      });
      return;
    }

    if (passwordUno !== passwordDos) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'La contraseña tienen que ser iguales!',
      });
      return;
    }


    this.servicio.putEditarUsuario( this.UsuarioSeleccionado.id, { password: passwordUno} )
    .subscribe(
      res => {
        if(res.ok == true){
          Swal.fire({
            icon: 'success',
            title: 'Exito',
            text: 'Contraseña cambiada!',
          });
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error al cambiar la contraseña!',
          });
        }
      }
    )
  }

  seleccionarVentana(id: number) {
    if (id == this.seleccionDeVentan) {
      this.seleccionDeVentan = 0;
    } else if (
      this.UsuarioSeleccionado.permisos == null
        ? false
        : this.UsuarioSeleccionado.permisos.permisosVentanas == null
        ? false
        : this.UsuarioSeleccionado.permisos.permisosVentanas.some(
            (x) => x.id_ventana == id
          )
    ) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        //text: 'Ya tiene esta ventana bloqueada! ',
        html: 'Ya tiene esta ventana bloqueada!<br> <br> <p class="text-sm text-gray-600 font-light" >Si desea desbloquearla, elimine el permiso</p>',
      });
      return;
    } else {
      this.seleccionDeVentan = id;
      this.agregarVentana = !this.agregarVentana;
    }
  }

  imagenSeleccionada: string = '';
  nombreDeLoSeleccionado(opciones: string): any {
    if (opciones == 'produccion') {
      this.imagenSeleccionada = this.ventanasProduccion.find(
        (x) => x.id == this.seleccionDeVentan
      )?.img;
      return this.ventanasProduccion.find((x) => x.id == this.seleccionDeVentan)
        ?.nombre;
    }
    if (opciones == 'ventas') {
      this.imagenSeleccionada = this.ventanasVentas.find(
        (x) => x.id == this.seleccionDeVentan
      )?.img;

      return this.ventanasVentas.find((x) => x.id == this.seleccionDeVentan)
        ?.nombre;
    }
  }

  agregarNuevaVentanaPermiso() {
    if (this.seleccionDeVentan === 0) {
      return;
    }

    let data = this.UsuarioSeleccionado.roles == 'ventas' 
    ? this.ventanasVentas.find(v => v.id === this.seleccionDeVentan ) 
    : this.ventanasProduccion.find(v => v.id === this.seleccionDeVentan ) ;
    this.servicio.postAgregarNuevoPermisoVentana(this.UsuarioSeleccionado.permisos.id, { id_ventana:data?.id! , nombre:data?.nombre! })
    .subscribe( 
      (res) => {

        if(res.ok == true){
          Swal.fire({
            icon: 'success',
            title: 'Exito',
            text: 'Se agrego el permiso correctamente',
          });

          this.UsuarioSeleccionado.permisos.permisosVentanas.push({
            id:res.data.id,
            id_ventana:data?.id! , 
            nombre:data?.nombre!
          })

 
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo agregar el permiso',
          });
        }

      }, (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo agregar el permiso',
        });
      }
    )
  }

  seleccionDeLocal(eventTarget: EventTarget) {
    let elemento = eventTarget as HTMLSelectElement;

    if (
      (this.UsuarioSeleccionado.local == null
        ? false
        : this.UsuarioSeleccionado.local.id == Number(elemento.value))         
    ) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Ya tiene este local como principal! ',
      });
      elemento.value = '0';

      return;
    }

    if (
      (this.UsuarioSeleccionado.permisos == null
        ? false
        : this.UsuarioSeleccionado.permisos.permisosLocales == null
        ? false
        : this.UsuarioSeleccionado.permisos.permisosLocales.some(
            (x) => x.local.id == parseInt(elemento.value)
          )) == true
    ) {
   

      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Ya tiene este local en tu lista! ',
      });
      elemento.value = '0';

      return;
    }


   /*  //verificar si tiene permisos
    if(this.UsuarioSeleccionado.permisos == null){
      this.UsuarioSeleccionado['permisos'] = {id:0,permisosLocales: [], permisosVentanas:[]};
    }
    // push en tiempo real 

    let localSeleccionado = this.dataLocales.find( x => x.id == parseInt(elemento.value)) as Local;
    this.UsuarioSeleccionado.permisos.permisosLocales.push({
      id: 0, // local el id que mando el permiso
      local:{id:localSeleccionado.id,nombre:localSeleccionado.nombre},
    });
 */

  }


  agregarLocalNuevo(target:string) {

    if (target == '') {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'El nombre del local no puede estar vacio! ',
      });
      return;
    }

    this.servicio.postAgregarNuevoPermisoLocal(this.UsuarioSeleccionado.permisos.id, { id_local:target })
    .subscribe(
      res => {
        console.log(res)
        if(res.ok == true){

          Swal.fire({
            icon: 'success',
            title: 'Exito',
            text: 'Se agrego el permiso correctamente',
          });

          let data = this.dataLocales.find(x => x.id == parseInt(target))
          this.UsuarioSeleccionado.permisos.permisosLocales.push({
            id: res.data.id, // local el id que mando el permiso
            local:{id:data?.id!, nombre: data?.nombre!}});
    
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo agregar el permiso',
          });
        }
      }, err => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo agregar el permiso',
        });
      }
    )


  }

  eliminarLocal(id:number) {
    this.servicio.deleteEliminarPermisoLocal(id)
    .subscribe(
      res => {

        if(res.ok === true) {
          Swal.fire({
            icon: 'success',
            title: 'Exito',
            text: 'Se elimino el permiso correctamente',
          });
          
          //eliminar por index el local de permisosLocal 
          this.UsuarioSeleccionado.permisos.permisosLocales.splice(
            this.UsuarioSeleccionado.permisos.permisosLocales.findIndex(
              (x) => x.id == id
            ),
            1
          );

        }else{
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo eliminar el permiso',
          });
        }
      })
  }

  eliminarVentana(id: number){
    this.servicio.deleteEliminarPermisoVentana(id)
    .subscribe(
      res => {
          
          if(res.ok === true) {
            Swal.fire({
              icon: 'success',
              title: 'Exito',
              text: 'Se elimino el permiso correctamente',
            });
            
            //eliminar por index el local de permisosLocal 
            this.UsuarioSeleccionado.permisos.permisosVentanas.splice(
              this.UsuarioSeleccionado.permisos.permisosVentanas.findIndex(
                (x) => x.id == id
              ),
              1
            );
  
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar el permiso',
            });
          }
        }
    )

  }

  arrayVentanas() {
    if (this.UsuarioSeleccionado.roles == 'VENTAS') {
      return this.ventanasVentas;
    } else {
      return this.ventanasProduccion;
    }
  }

  arrayNull(arrayPermisos: PermisosLocales[] | PermisosVentanas[]): any {
    console.log(arrayPermisos);

    let array: [] = [];

    if (arrayPermisos == null) {
      return array;
    } else {
      return arrayPermisos;
    }
  }

  Track(index: number, obj: any) {

    console.log(index);
    console.log(obj);

  }


}
