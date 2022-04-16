import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IProductosData } from '../interfaces/interface_produccion';
import { ProduccionService } from '../servicios/produccion.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  dropDownList:any;

  arrayProducto:any ;
  items:any = [];
  pageOfItems!: Array<any>;

  abrirVentana:boolean = false
  /* arrayProductos!:[] */

  estadoDePagina:number = 0;

  daataPrueba!:IProductosData
  @ViewChild('categoryScrollX')categoryScrollX!:ElementRef<HTMLInputElement>;
  @ViewChild('box')box!:ElementRef<HTMLInputElement>;

  constructor(public servicioProduccion:ProduccionService) {

   }

  valueFilter:boolean = false;

  ngOnInit(): void {
/*     this.servicioProduccion.getProductos().subscribe(
      (res) => {
        this.arrayProducto = res.data;
        this.calcularPaginas(res.contador);

      }
    ); */
    this.productosYbuscador();

    

    this.servicioProduccion.cerrarAbrirVentana$.subscribe(
      (res) => {
        this.abrirVentana = res;
      }
    );
  }


  productosYbuscador(busqueda: string = '', pagina: string | number = 0){

    this.servicioProduccion.getProductos(busqueda, pagina).subscribe(
      (res) => {
        this.arrayProducto = res.data;
        this.calcularPaginas(res.contador);

      }
    );

  }

  viewFilter(){
    this.valueFilter = !this.valueFilter;
 
  }
  

  cambioDePagina(paginaSiguiente:any) {

  
    this.estadoDePagina = parseInt(paginaSiguiente.target.attributes.id.nodeValue)

/*     if((this.items[this.items.length - 1]) >= this.estadoDePagina ){
      console.log('adios')
      this.moveCategory('right', 40);
    }else if(this.estadoDePagina > 0){
      console.log('hola')
      this.moveCategory('left', 40)
    } */

    this.productosYbuscador( '', this.estadoDePagina + '0');

    console.log(this.estadoDePagina +'0')
  

  }


  cambioDePaginaNext(derechaIzquierda:boolean){

    if(derechaIzquierda == true){
      if((this.items[this.items.length - 1]) > this.estadoDePagina )
      
      this.estadoDePagina +=  1;
      this.productosYbuscador('', this.estadoDePagina + '0');
      this.moveCategory('right', 20);

    }else{
      if(this.estadoDePagina > 0)
      this.estadoDePagina -= 1;
      this.productosYbuscador('', this.estadoDePagina + '0');
      this.moveCategory('left', 20)

    }
  }

  calcularPaginas (contador: string){

    let paginas = parseInt(contador) / 10;
    let cantidadPaginas = Math.ceil(paginas);

    this.items = Array(cantidadPaginas).fill(0).map((x,i)=>i);

  }



  moveCategory(value: string, mover:number){

    

    value === 'right'
    ? this.categoryScrollX.nativeElement.scrollTo({ left: (this.categoryScrollX.nativeElement.scrollLeft + mover), behavior: 'smooth' })
    : this.categoryScrollX.nativeElement.scrollTo({ left: (this.categoryScrollX.nativeElement.scrollLeft - mover), behavior: 'smooth' })

  }

  mostrarProductos(id:string){

    this.arrayProducto.map( (e:any) => {
      if(e.id == id){
        this.daataPrueba = e
        this.abrirVentana = true;
      }
    })
  }


  onKey(searchValue: any): void {  
    console.log(searchValue);
    this.box.nativeElement.value = '';
    this.productosYbuscador(searchValue);
  }
}
