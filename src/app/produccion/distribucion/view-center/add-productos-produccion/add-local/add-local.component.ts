import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IAgregarDistribucion } from 'src/app/produccion/interfaces/interface_produccion';
import { ProduccionService } from 'src/app/produccion/servicios/produccion.service';
import { VentasService } from 'src/app/ventas/servicios/ventas.service';


@Component({
  selector: 'app-add-local',
  templateUrl: './add-local.component.html',
  styleUrls: ['./add-local.component.css']
})
export class AddLocalComponent implements OnInit {

  @Input() cantidad_restar!:number;

  tituloAlerta:string = "";
  mensajeAlerta:string = "";
  estadoDeAlerta:boolean = false

  dataInfo: IAgregarDistribucion[] = [];

  arrayDeLocales:any
  @Output()
  prueba:EventEmitter<string> = new EventEmitter<string>();


  @Output()
  arrayAgregarDis:EventEmitter<IAgregarDistribucion[]> = new EventEmitter<IAgregarDistribucion[]>();

  @Input()dataAntiguaVentana:IAgregarDistribucion[]= []

  @Input()dataArrayHistorial:any;

  constructor(public servicioProduccion:ProduccionService,public servicioVentas:VentasService) { }

  ngOnInit(): void {
    console.log(this.dataArrayHistorial)

    this.cantidad_restar = this.servicioProduccion.cantidadDistribucion$
    //this.dataInfo = JSON.parse(localStorage.getItem('dataForm')!);

    this.dataInfo = this.dataAntiguaVentana;

    this.servicioVentas.getObtenerLocales().subscribe( (res:any) => {
      this.arrayDeLocales = res.data;
      console.log(this.arrayDeLocales)
    }
    )

  }

  onclick(){
    this.prueba.emit('hola soy el hijo')
  }

  funcAlertas(titulo: string, mesanje: string){
    this.tituloAlerta = titulo;
    this.mensajeAlerta = mesanje;

    this.estadoDeAlerta = true;

    setTimeout(() => {
      this.estadoDeAlerta = false;
    }
    , 20000);

  }

  eliminarLocalOTalles(nombre:string, local:string, talle:any = ""){
    let data:IAgregarDistribucion[] = this.dataInfo;


    if(nombre === "local"){


    data.map( (item, index) => {
      if(item.local === local){

        item.talle.map( can => this.cantidad_restar += parseInt(can.cantidad) )

        this.servicioProduccion.cambiosCantidad$.emit(this.cantidad_restar)
        data.splice(index,1);



        this.arrayAgregarDis.emit(this.dataInfo);
        
      }
    })

    }else if(nombre === "talle"){

      data.map( (item, index) => {
        if(item.local === local){
          item.talle.map( (talleData, indexTalle) => {
            if(talleData.talle === talle){
             
             
              this.servicioProduccion.cambiosCantidad$.emit( this.cantidad_restar += parseInt(talleData.cantidad))

              item.talle.splice(indexTalle,1);
              this.arrayAgregarDis.emit(this.dataInfo);

            }
          })
        }

      })

    }
  }

  funcOrdenarTaller(array:any){
    
    return array.sort((a:any, b:any) => a.talle - b.talle)
  
  }

  
  funcRestarSumar(accion:string, array:any ):any{

  
    if(accion === 'sumar'){


      
    }else if(accion === 'restar'){

      if(this.cantidad_restar <= 0 || this.cantidad_restar < array){

        this.funcAlertas('Error', 'No puede restar mas de lo que se tiene')
        return false;
      }

      

      this.cantidad_restar = this.cantidad_restar - array;
      this.servicioProduccion.cambiosCantidad$.emit(this.cantidad_restar)


    }

  }
  formDistribucion(cantidad:any, talle:any, local:string):any{

    if(local == ''){

      return alert("Seleccione un local")
    }


    for(let x of this.dataArrayHistorial){

      if(x.local == local){

        for( let t of x.talle){
      
            if(t.talle == talle){
              this.funcAlertas('Error', 'El local ya tiene este talle guardado anteriormente . Por favor seleccione otro local o talle, o elimine el talle guardado')
              return false;
            }
        }
      }

    }

    if(this.dataInfo === null || this.dataInfo.length == 0) {


    if(this.funcRestarSumar('restar', cantidad) == false){
      return false;
    }

    this.dataInfo.push({
      local: local,
      talle:[
        {
          talle: talle,
          cantidad: cantidad
        }
      ]
    })

    this.arrayAgregarDis.emit(this.dataInfo);


      
    }else{
      let data:IAgregarDistribucion[] = this.dataInfo;




      


      for(let item of data){

        if(data.some(x => x.local === local) === false){

          if(this.funcRestarSumar('restar', cantidad) == false){
            return false;
          }
          
          data.push({
            local: local,
            talle:[
              {
                talle: talle,
                cantidad: cantidad
              }
            ]
          });

    
          this.arrayAgregarDis.emit(this.dataInfo);

        
          return;
        }


        if(item.local === local){




            if(data.some(x => x.local === local) === true && item.talle.some(x => x.talle === talle) === false){

              //talles.cantidad = talle.cantidad + cantidad;
              if(this.funcRestarSumar('restar', cantidad) == false){
                return false;
              }

              item.talle.push({
                talle: talle,
                cantidad: cantidad
              });
            
              
              this.arrayAgregarDis.emit(this.dataInfo);

              return;
              
            }else{
              console.log("entre aca")


              this.funcAlertas('alerta','ya existe talle, en el local');
              return;
            }

          //}
       
        }
      }
    

    }


  }


  obtenerSoloElnombre(id:any){
    if (this.arrayDeLocales !== undefined) {
      return this.arrayDeLocales.find((x: any) => x.id === parseInt(id)).nombre;
    }


  }
}
