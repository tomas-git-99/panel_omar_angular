import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { VentasService } from '../../servicios/ventas.service';

@Component({
  selector: 'app-agregar-productos',
  templateUrl: './agregar-productos.component.html',
  styleUrls: ['./agregar-productos.component.css'],
})
export class AgregarProductosComponent implements OnInit {


  arrayDeTalles: any[] = [];
  FormAgregarProductos!: FormGroup;


  @Output()
  cerrarVentana:EventEmitter<boolean> = new EventEmitter<boolean>();


  arrayCategorias:any;
  arrayLocales:any;

  constructor( private _builder: FormBuilder, public servicioVentas:VentasService) {}

  ngOnInit(): void {

    this.FormAgregarProductos = this._builder.group({
      precio: ['', Validators.required],
      color: ['', Validators.required],
      sub_modelo: ['', Validators.required],
      sub_dibujo: ['', Validators.required],
      sub_tela: ['', Validators.required],
      categoria: ['', Validators.required],
      sub_local: ['', Validators.required],
    });

    this.servicioVentas.getObtenerCategorias().subscribe(
      (res) => {
      this.arrayCategorias = res.data;
    }
    );

    this.servicioVentas.getObtenerLocales().subscribe(
      (res) => {
      this.arrayLocales = res.data;
    }
    );

    
  }

  agregarNuevaTalle(talle: number | string, cantidad: number | string) {


    if(cantidad == 0 || talle == ''){
      return alert("No se puede dejar espacio vacios");
    }
    if (this.arrayDeTalles == undefined) {
      this.arrayDeTalles = [
        ...this.arrayDeTalles,
        { talles: talle, cantidad: cantidad },
      ];
      this.arrayDeTalles.sort((a, b) => a.talles - b.talles); 
    }

    if (this.arrayDeTalles.some((x) => x.talles == talle) == false) {
      this.arrayDeTalles.push({ talles: talle, cantidad: cantidad });
      this.arrayDeTalles.sort((a, b) => a.talles - b.talles); 

    } else {
      alert('El talle ya esta agregado');
    }
  }


  eliminarTalle(talle: number | string){

    //eliminar del array arrayDeTalles por el talle con el index 

    this.arrayDeTalles.splice(this.arrayDeTalles.findIndex(x => x.talle == talle), 1);
    this.arrayDeTalles.sort((a, b) => a.talle - b.talle); 

  }

  BotonCarga:boolean = false;

  agregarProductosNuevos(values:any){


    if(this.arrayDeTalles.length == 0 ){
      return alert("No se puede dejar espacio vacios");
    }


    Object.keys(values).map(function(key, index) {
      if(values[key] == '' || values[key] == null){
        delete values[key];
      }
    });
    
    let data = {
      producto:values,
      talles:this.arrayDeTalles
    }

    console.log(data);

    this.servicioVentas.postCrearProuductoVentas(data).subscribe(
      (res:any) => {
        if(res.ok == true){
          
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '',
            showConfirmButton: false,
            timer: 1500
          })
          this.BotonCarga = false;
          this.arrayDeTalles = [];
          this.FormAgregarProductos.reset();

        }else{
          this.BotonCarga = false;


          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo salió mal!',

          })
        }
        (error:any) => {
         
          this.BotonCarga = false;

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo salió mal!',

          })
        }
      }
    )
  }
}
