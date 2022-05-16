import { Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
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

  listaDeFiltros:boolean = false

  cargaArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  cargaDeTables:boolean = false;


  objDeFiltro:any = {
    modelo:'',
    tela:'',
    peso_promedio:'',
    taller:'',
    dibujo:'',
  }

  @Input() cantidadPaginas:number = 0;

  daataPrueba!:IProductosData
  @ViewChild('categoryScrollX')categoryScrollX!:ElementRef<HTMLInputElement>;
  @ViewChild('box')box!:ElementRef<HTMLInputElement>;

  filtroInput:string[] = [];
  historialDeBusqueda:string ='';
 

  constructor(public servicioProduccion:ProduccionService) {

   }

  valueFilter:boolean = false;

  ngOnInit(): void {

    this.servicioProduccion.actualizarPagina$.emit(true)

    

    this.productosYbuscador();

    

    this.servicioProduccion.cerrarAbrirVentana$.subscribe(
      (res) => {
        this.abrirVentana = res;
      }
    );
  }
  paginaciones(pagina:any){
    console.log(pagina)

  }

  productosYbuscador(
    busqueda: string = '', 
    pagina: any | string | number = 0,
    modelo:string = '',
    tela:string = '',
    peso_promedio:string = '',
    taller:string = '',
    dibujo:string = '',
    edad:string = ''
    ){
    this.historialDeBusqueda = busqueda;
    this.cargaDeTables = true;
    this.servicioProduccion.getProductos(
      busqueda, 
      pagina, 
      modelo, 
      tela,
      peso_promedio,
      taller,
      dibujo,
      edad
      ).subscribe(
      (res) => {
        
        if(res.ok == true){

          console.log(res)
          
          this.cantidadPaginas = res.contador;

          this.cargaDeTables = false;

          this.arrayProducto = res.data;
          this.calcularPaginas(res.contador);


        
        }else{
          this.cargaDeTables = false;

        }
      
      },(error) => {
        this.cargaDeTables = false;

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

    this.filtroInput.length > 0 
    ? this.inputConfiltros(this.filtroInput, this.historialDeBusqueda, this.estadoDePagina + '0')
    : this.productosYbuscador('', this.estadoDePagina + '0');

   /*  this.productosYbuscador( '', this.estadoDePagina + '0'); */

    console.log(this.estadoDePagina +'0')
  

  }


  cambioDePaginaNext(derechaIzquierda:boolean){

    if(derechaIzquierda == true){
      if((this.items[this.items.length - 1]) > this.estadoDePagina )
      
      this.estadoDePagina +=  1;
      this.filtroInput.length > 0 
      ? this.inputConfiltros(this.filtroInput, this.historialDeBusqueda, this.estadoDePagina + '0')
      : this.productosYbuscador('', this.estadoDePagina + '0');
      this.moveCategory('right', 20);

    }else{
      if(this.estadoDePagina > 0)
      this.estadoDePagina -= 1;
      this.filtroInput.length > 0 
      ? this.inputConfiltros(this.filtroInput, this.historialDeBusqueda, this.estadoDePagina + '0')
      : this.productosYbuscador('', this.estadoDePagina + '0');
      
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
/* 
    this.inputConfiltros(
      this.filtroInput, 
      searchValue,
      this.objDeFiltro.mo
      ); */

      this.productosYbuscador(
        searchValue, 0, 
        this.objDeFiltro.modelo, 
        this.objDeFiltro.tela,
        this.objDeFiltro.peso_promedio,
        this.objDeFiltro.taller,
        this.objDeFiltro.dibujo,
        this.objDeFiltro.edad
        );

  }

  paginacion(value: any){
    this.productosYbuscador(
      this.historialDeBusqueda, 
      value, 
      this.objDeFiltro.modelo, 
      this.objDeFiltro.tela,
      this.objDeFiltro.peso_promedio,
      this.objDeFiltro.taller,
      this.objDeFiltro.dibujo,
      this.objDeFiltro.edad
      );
  }
  inputConfiltros(valor:any, palabra:string = '' , skip:number | string = 0){ 

    this.servicioProduccion.postProductosObtnerProductos(({data:valor}),palabra, skip).subscribe(
      (res) => {
        console.log(res)
        this.arrayProducto = res.data;
        this.calcularPaginas(res.contador);

      }
    );
  }


  seleccionDeCheck(valor:any):void {

    this.objDeFiltro[valor.target.value] = !this.objDeFiltro[valor.target.value];


    if(valor.target.checked == true){
      this.filtroInput.push(valor.target.value);
    }else{
      this.filtroInput.splice(this.filtroInput.indexOf(valor.target.value), 1);
    }  
  }



}
