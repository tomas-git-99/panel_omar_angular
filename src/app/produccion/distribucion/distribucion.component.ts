import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faChevronLeft, faChevronRight, faShirt, faTrash, faUser, faUserAlt, faUsersRectangle } from '@fortawesome/free-solid-svg-icons';
import { ProduccionService } from '../servicios/produccion.service';

@Component({
  selector: 'app-distribucion',
  templateUrl: './distribucion.component.html',
  styleUrls: ['./distribucion.component.css']
})
export class DistribucionComponent implements OnInit {
  dropDownList:any;


  isMenu: boolean = false;

  faArrowLeft = faChevronLeft;
  faArrowRight = faChevronRight;
  faTrash = faTrash;
  faUser = faUser;
  faShirt = faShirt;

  isSubTable: boolean = false;

  isDistribucion: boolean = false;
  categoryChange:any[] = [
    'todo',
    'proceso',
    'entregados',
  ] 
  valueHomeCategory:string = 'todo'

  dataArrays:any
  dataArraysSub:any = {}


  cantidadEntega!:number;
  @ViewChild('categoryScrollX')categoryScrollX!:ElementRef<HTMLInputElement>;


  VentanaDeEliminar:boolean = false;
  VentanaDeFallas:boolean = false;
  IDventanas:string = "";


  constructor( public servicioProduccion:ProduccionService) { }

  ngOnInit(): void {

    this.servicioProduccion.getDistribucion().subscribe(
      (res) => {
        this.dataArrays = res.data;

        console.log(this.dataArrays)

        res.data.forEach((element:any) => {

         this.dataArraysSub[element.id] = false;

        })

      }
    )
   

    this.servicioProduccion.cerrarAbrirVentanaDistribucion$.subscribe(
      (res) => {
        this.isDistribucion = res;
      }
    )
    

  }


  


  viewSubTable(id:number){
    
    this.dataArraysSub[id] ? this.dataArraysSub[id] = false : this.dataArraysSub[id] = true;
    this.isSubTable = !this.isSubTable;
  }

  changeCategory(category: string){
    
    category === this.valueHomeCategory ? this.valueHomeCategory : this.valueHomeCategory = category;
  }


  moveCategory(value: string){

    console.log(value)

    value === 'right'
    ? this.categoryScrollX.nativeElement.scrollTo({ left: (this.categoryScrollX.nativeElement.scrollLeft + 150), behavior: 'smooth' })
    : this.categoryScrollX.nativeElement.scrollTo({ left: (this.categoryScrollX.nativeElement.scrollLeft - 150), behavior: 'smooth' })

  }


  sumaYtalles( array:any[], metodo:string):any{

    if(metodo === 'cantidad'){
      let suma:number = 0;

      array.forEach((element:any) => {
        
        if(element.cantidad){
          suma += element.cantidad;
        }
      })
  
      return suma;
  
    }else if(metodo === 'talles'){

      let talles:string = '';

      array.forEach((element:any) => {
        talles += element.talle + ',';
      })

      return talles;
    }

  
  }

  abrirAgregarDistribucion(cantidad:number){

    this.isDistribucion = !this.isDistribucion;

    this.servicioProduccion.cantidadDistribucion$ = cantidad;

    //this.cantidadEntega = cantidad; 
    //this.cantidadEntega = localStorage.setItem('cantidad', cantidad) as unknown as number; 
  }

  
}
