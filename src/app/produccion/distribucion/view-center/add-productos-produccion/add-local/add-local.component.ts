import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IAgregarDistribucion } from 'src/app/produccion/interfaces/interface_produccion';
import { ProduccionService } from 'src/app/produccion/servicios/produccion.service';


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

  @Output()
  prueba:EventEmitter<string> = new EventEmitter<string>();


  @Output()
  arrayAgregarDis:EventEmitter<IAgregarDistribucion[]> = new EventEmitter<IAgregarDistribucion[]>();

  @Input()dataAntiguaVentana:IAgregarDistribucion[]= []
  constructor(public servicioProduccion:ProduccionService) { }

  ngOnInit(): void {

    this.cantidad_restar = this.servicioProduccion.cantidadDistribucion$
    //this.dataInfo = JSON.parse(localStorage.getItem('dataForm')!);

    this.dataInfo = this.dataAntiguaVentana;

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
    , 4000);

  }

  eliminarLocalOTalles(nombre:string, local:string, talle:any = ""){
    let data:IAgregarDistribucion[] = this.dataInfo;


    if(nombre === "local"){


    data.map( (item, index) => {
      if(item.local === local){
        data.splice(index,1);
        //localStorage.setItem('dataForm',JSON.stringify(data));
    this.arrayAgregarDis.emit(this.dataInfo);
        
      }
    })

    }else if(nombre === "talle"){

      data.map( (item, index) => {
        if(item.local === local){
          item.talle.map( (talleData, indexTalle) => {
            if(talleData.talle === talle){
              console.log('estoy aca')
              item.talle.splice(indexTalle,1);
    this.arrayAgregarDis.emit(this.dataInfo);

              //localStorage.setItem('dataForm',JSON.stringify(data));
              //this.dataInfo = JSON.parse(localStorage.getItem('dataForm')!);
            }
          })
        }

      })

/*       if(data.some(x => x.local === local) === true && data.some(x => x.talle.length < 0) === true){
        data.map( (item, index) => {

          if(item.local === local){
            data.splice(index,1);
            localStorage.setItem('dataForm',JSON.stringify(data));
            this.dataInfo = JSON.parse(localStorage.getItem('dataForm')!);
          }
          
        })
      } */
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

    if(this.dataInfo === null || this.dataInfo.length == 0) {



    //this.funcRestarSumar('restar', cantidad);

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


    console.log('se creo nuevo array')
      
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

          console.log('local nuevo');
          return;
        }


        if(item.local === local){

          //for(let talles of item.talle){

            if(data.some(x => x.local === local) === true && item.talle.some(x => x.talle === talle) === false){

              //talles.cantidad = talle.cantidad + cantidad;
              if(this.funcRestarSumar('restar', cantidad) == false){
                return false;
              }

              item.talle.push({
                talle: talle,
                cantidad: cantidad
              });
              console.log('se agrego talle')
              //this.funcRestarSumar('restar', cantidad);

              //localStorage.setItem('dataForm',JSON.stringify(data));
             // this.dataInfo = JSON.parse(localStorage.getItem('dataForm')!);
              this.arrayAgregarDis.emit(this.dataInfo);

              return;
              
            }else{
              //console.log('ya existe talle')

              this.funcAlertas('alerta','ya existe talle, en el local');
              return;
            }

          //}
       
        }
      }
    

    }


  }
}
