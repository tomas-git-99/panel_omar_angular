import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-paginacion',
  templateUrl: './paginacion.component.html',
  styleUrls: ['./paginacion.component.css']
})
export class PaginacionComponent implements OnInit {

  constructor() { }

 
  @Input() 
  estadoDePagina:number = 0;

  @Output() 
  paginacion = new EventEmitter<number | string>();


  items:any = [];


  @ViewChild('categoryScrollX')categoryScrollX!:ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    
    this.calcularPaginas(this.estadoDePagina)
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
  
    //paginacion end

}
