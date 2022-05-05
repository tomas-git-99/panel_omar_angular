import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, OnChanges } from '@angular/core';

@Component({
  selector: 'app-paginacion-produccion',
  templateUrl: './paginacion-produccion.component.html',
  styleUrls: ['./paginacion-produccion.component.css']
})
export class PaginacionProduccionComponent implements OnInit, OnChanges {

  constructor() { }

 
  estadoDePagina:number  = 0;
  @Input() conteoDePagina!:number ;

  @Output() 
  paginacion = new EventEmitter<number | string>();


  items:any = [];


  @ViewChild('categoryScrollX')categoryScrollX!:ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    
  }


  ngOnChanges(){
    console.log(this.estadoDePagina)
    this.calcularPaginas(this.conteoDePagina)

  }

  

    //paginacion
  
    productosYbuscador(busqueda: string = '', pagina: string | number = 0 ){
  
  
  
    }
  
  
    cambioDePagina(paginaSiguiente:any) {
  
    
      this.estadoDePagina = parseInt(paginaSiguiente.target.attributes.id.nodeValue)
  
      /* this.productosYbuscador( '', this.estadoDePagina + '0'); */
  

      this.paginacion.emit(this.estadoDePagina + '0');

    
    }
  
  
    cambioDePaginaNext(derechaIzquierda:boolean){
  
      if(derechaIzquierda == true){
        if((this.items[this.items.length - 1]) > this.estadoDePagina )
        
        this.estadoDePagina +=  1;
     
        //this.productosYbuscador('', this.estadoDePagina + '0');
        this.paginacion.emit(this.estadoDePagina + '0');

        this.moveCategory('right', 20);
  
      }else{
        if(this.estadoDePagina > 0)
        this.estadoDePagina -= 1;


        //this.productosYbuscador('', this.estadoDePagina + '0');
        this.paginacion.emit(this.estadoDePagina + '0');

        this.moveCategory('left', 20)
  
      }
    }
  
    moveCategory(value: string, mover:number){
  
      value === 'right'
      ? this.categoryScrollX.nativeElement.scrollTo({ left: (this.categoryScrollX.nativeElement.scrollLeft + mover), behavior: 'smooth' })
      : this.categoryScrollX.nativeElement.scrollTo({ left: (this.categoryScrollX.nativeElement.scrollLeft - mover), behavior: 'smooth' })
  
    }
  
    calcularPaginas (contador: number){
  
      let paginas = contador/ 10;
      let cantidadPaginas = Math.ceil(paginas);
  
      this.items = Array(cantidadPaginas).fill(0).map((x,i)=>i);
  
    }

}
