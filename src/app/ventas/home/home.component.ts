import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProduccionService } from 'src/app/produccion/servicios/produccion.service';
import { InfoProductos, ProductosVentasTodos } from '../inter/productosVentasTodos';
import { VentasService } from '../servicios/ventas.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dropDownList:any;


  isMenu: boolean = false;

  isSubTable: boolean = false;
  isList:any;
  subList = 3;

  filtroPorOpciones:boolean = false;

  filtroPorFechas:boolean = false;
  dataArraysSub:any = {}


  localesMostar:boolean = false;
  

  arraYprueba:any[] = [1,2,3,4,5,6]

  categoryChange:any[] = [
    'todo',
    'camisetas',
    'buzos',
    'camperas'
  ] 
  objDeFiltro:any = {
    modelo:'',
    color:'',
    dibujo:'',
  }
  filtroInput:string[] = [];

  valueHomeCategory:string = 'todo'

  @ViewChild('categoryScrollX')categoryScrollX!:ElementRef<HTMLInputElement>;
  @ViewChild('box')box!:ElementRef<HTMLInputElement>;


  arrayProductos!:InfoProductos[]

  arrayLocales!:[{id:number, nombre:string}]

  IDLocalSeleccionado:number = 0;


  valorInput = null;

  constructor(public servicioVentas:VentasService, public servicioProduccion:ProduccionService) { }

  ngOnInit(): void {

    this.servicioProduccion.actualizarPagina$.emit(true)

    this.servicioVentas.getObtenerLocales().subscribe(
      res => {
        this.arrayLocales = res.data;
      })
    this.productosYbuscador();
  }




  viewSubTable(id:number){
    this.dataArraysSub[id] = !this.dataArraysSub[id];
 
  }

  changeCategory(category: string){
    
    category === this.valueHomeCategory ? this.valueHomeCategory : this.valueHomeCategory = category;
  }


/*   moveCategory(value: string){

    value === 'right'
    ? this.categoryScrollX.nativeElement.scrollTo({ left: (this.categoryScrollX.nativeElement.scrollLeft + 150), behavior: 'smooth' })
    : this.categoryScrollX.nativeElement.scrollTo({ left: (this.categoryScrollX.nativeElement.scrollLeft - 150), behavior: 'smooth' })

  } */


  seleccionDeCheck(valor:any):void {

    
    this.objDeFiltro[valor.target.value] = !this.objDeFiltro[valor.target.value];


    if(valor.target.checked == true){
      this.filtroInput.push(valor.target.value);
    }else{
      this.filtroInput.splice(this.filtroInput.indexOf(valor.target.value), 1);
    }  
  }

  productosYbuscador(
    busqueda: string = '', 
    pagina: string | number = 0,
    modelo:string | boolean = '',
    dibujo:string | boolean = '',
    color:string | boolean = '',
    local:number | string = '',
    ){

      this.servicioVentas.getObtenerProductos(
        busqueda,
        pagina,
        modelo,
        dibujo,
        color,
        local
       ).subscribe(
         res => {
           console.log(res)
           
           this.arrayProductos = res.data;

           res.data.forEach((element:any) => {

            this.dataArraysSub[element.id] = false;
   
           })
           this.calcularPaginas(res.contador);
         }
       )

  } 

    //paginacion
    estadoDePagina:number = 0;
    items:any = [];
  
   
  
  
    cambioDePagina(paginaSiguiente:any) {
  
    
      this.estadoDePagina = parseInt(paginaSiguiente.target.attributes.id.nodeValue)
  
  
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
  
    moveCategory(value: string, mover:number){
  
      value === 'right'
      ? this.categoryScrollX.nativeElement.scrollTo({ left: (this.categoryScrollX.nativeElement.scrollLeft + mover), behavior: 'smooth' })
      : this.categoryScrollX.nativeElement.scrollTo({ left: (this.categoryScrollX.nativeElement.scrollLeft - mover), behavior: 'smooth' })
  
    }
  
    calcularPaginas (contador: number ){
  
      //let paginas = parseInt(contador) / 10;
      let cantidadPaginas = Math.ceil(contador / 10);
     // let cantidadPaginas = Math.ceil(paginas);
  
      this.items = Array(cantidadPaginas).fill(0).map((x,i)=>i);
  
    }


    mostrarLocales(value:any){
  
      if(value.target.checked == true){
        this.localesMostar = true
      }else{
        this.localesMostar = false;
        this.IDLocalSeleccionado = 0;
      }
    }

    selecccionDeLocal(value:any){

      this.IDLocalSeleccionado = value.target.value;
    }

    onKey(event:any){
      this.productosYbuscador(event,'', this.objDeFiltro.modelo, this.objDeFiltro.dibujo, this.objDeFiltro.color, (this.IDLocalSeleccionado == 0 ? '' : this.IDLocalSeleccionado));
    }
    reset(){
      
    }

}
