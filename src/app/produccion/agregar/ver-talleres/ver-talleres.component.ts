import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { ProduccionService } from '../../servicios/produccion.service';

@Component({
  selector: 'app-ver-talleres',
  templateUrl: './ver-talleres.component.html',
  styleUrls: ['./ver-talleres.component.css']
})
export class VerTalleresComponent implements OnInit {


  @Output()
  cerrarVentana = new EventEmitter<any>();

  cantidadPaginas:number = 0;
  arrayTalleres:any;


  abrirVentanaEditar:boolean = false;
  nombre:string = "";
  telefono:string = "";
  direccion: string = "";

  faEllipsi = faEllipsis

  tallerSeleccionado:any

  FormTaller!:FormGroup;

  constructor(public servicioProduccion:ProduccionService, private _builder: FormBuilder) { }

  ngOnInit(): void {




    this.FormTaller = this._builder.group({
      nombre_completo: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      estado: ['', Validators.required]
    })

    this.buscadorYPaginacion();
  }


  paginacion(numeroPagina:any){
    this.buscadorYPaginacion('', numeroPagina);

  }


  buscadorYPaginacion(buscador:any = '', paginacion:any = 0,){ 

    this.servicioProduccion.getTallerALL(buscador, paginacion).subscribe
    (
      res => {
        console.log(res)

        this.arrayTalleres = res.data;

        this.cantidadPaginas = res.contador
      }
    )
  }

  editarTalleres(id:any){

    this.abrirVentanaEditar = true;

    this.arrayTalleres.map (
      (x:any )=> {
        if(x.id == id){
          this.tallerSeleccionado = x;
      }}
    )

    
  }

  BotonCarga:boolean = false;
  
  formTaller(data:any) {

    Object.keys(data).map(function(key, index) {
      if(data[key] == '' || data[key] == null){
        delete data[key];
      }
    });


     if( Object.keys(data)[0] == 'estado' ){

      data.estado == "true" 
      ? data.estado = true 
      : data.estado = false;
    } 



    console.log(data)


    this.servicioProduccion.putEditarTaller(this.tallerSeleccionado.id,data).subscribe
    (
      res => {
        if(res.ok == true){
          
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '',
            showConfirmButton: false,
            timer: 1500
          })

          this.BotonCarga = false;

          let datos = this.tallerSeleccionado

          Object.keys(data).map(function(key, index) {
            
            datos[key] = data[key];

          })


          this.FormTaller.reset();

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
