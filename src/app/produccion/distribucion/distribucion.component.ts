import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faChevronLeft, faChevronRight, faShirt, faTrash, faUser, faUserAlt, faUsersRectangle } from '@fortawesome/free-solid-svg-icons';
import { ProduccionService } from '../servicios/produccion.service';
import Swal from 'sweetalert2'


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

  isDistribucion: boolean = false; // ventana distribucion cambiar a false 
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


  //disctribucion

  IDProductoParaDistribucion!:number | string;

  seleccionDistribucion:any;


  conteoDepagina:number = 0;
  buscadorValor:string = "";


  constructor( public servicioProduccion:ProduccionService) { }

  


  eliminarArmadoresRepetidos(array:any){

    let dataArray:string = '';

      array.forEach( (x:any, index:any) => {
    
        
        if(dataArray.split(' - ').some( v => v == (x.usuario == null ? '' : x.usuario.nombre) ) == false){

          if(index == 0){
            dataArray = x.usuario.nombre;

          }else{
            dataArray += ' - ' + x.usuario.nombre;
          }
        }
  
    })
    return dataArray;
   
 
  }

  cambiarEstadoEnvio(id:string, estado:boolean){

    Swal.fire({
      title: 'Esta seguro que quiere cambiar el estado de Envio?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {

        this.servicioProduccion.putProductosEditar(id, {enviar_ventas: !estado} ).subscribe( res =>{
          if (res.ok == true){

            this.dataArrays.find( (x:any) => x.id == id).enviar_ventas = !estado;

            Swal.fire(
              'Estado de Envio Cambiado',
              '',
              'success'
            )

          }else{
            Swal.fire(
              'Error',
              '',
              'error'
            )
          }
        })
      

      }
    })
  }

  ngOnInit(): void {

    this.servicioProduccion.actualizarDataAlEliminar$.subscribe( (data:any)=>{


      this.dataArrays.map((x:any) => {

        x.distribucion.map( (p:any, index:any) => {
          if(p.id == data){
  
            x.distribucion.splice(index,1)
          }
        })

      })

      
    })

    this.servicioProduccion.actualizarDataAlAgregar$.subscribe( (data:any) => {

      this.dataArrays.find( (x:any) => x.id == data.id).distribucion =  data.distribucion ;
      this.dataArrays.find( (x:any) => x.id == data.id).cantidad_actual = data.cantidad_actual;
    })

 /*    this.servicioProduccion.getDistribucion().subscribe(
      (res) => {
        this.dataArrays = res.data;

        console.log(this.dataArrays)

       
        res.data.forEach((element:any) => {

         this.dataArraysSub[element.id] = false;

        })

      }
    ) */
    this.productosYbuscador();
   

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


/*   moveCategory(value: string){

    console.log(value)

    value === 'right'
    ? this.categoryScrollX.nativeElement.scrollTo({ left: (this.categoryScrollX.nativeElement.scrollLeft + 150), behavior: 'smooth' })
    : this.categoryScrollX.nativeElement.scrollTo({ left: (this.categoryScrollX.nativeElement.scrollLeft - 150), behavior: 'smooth' })

  } */


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

      array.sort((a, b) => parseFloat(a.talle) - parseFloat(b.talle));
      array.forEach((element:any , index:number) => {
        if(index === 0){
          talles += element.talle
        }else{
          talles += '-' + element.talle ;

        }
      })

      return talles;
    }

  
  }

  abrirAgregarDistribucion(cantidad:number ,id:any){

    this.isDistribucion = !this.isDistribucion;

    this.servicioProduccion.cantidadDistribucion$ = cantidad;

    this.servicioProduccion.IDProductoParaDistribucion = id;


    this.seleccionDistribucion = this.dataArrays.find( (d:any)=> d.id == id)

    //this.cantidadEntega = cantidad; 
    //this.cantidadEntega = localStorage.setItem('cantidad', cantidad) as unknown as number; 
  }


  //paginacion
  estadoDePagina:number = 0;
  items:any = [];

  productosYbuscador(busqueda: string = '', pagina: string | number = 0 ){

 
    this.buscadorValor = busqueda;

    this.servicioProduccion.getDistribucion(busqueda, pagina).subscribe(
      (res) => {
        this.dataArrays = res.data;

        console.log(res)

        res.data.forEach((element:any) => {

         this.dataArraysSub[element.id] = false;

        })
        this.conteoDepagina = res.contador;

        this.calcularPaginas(res.contador);


      }
    )



  }
  paginacion(valor:any){
    this.productosYbuscador(this.buscadorValor, valor);
  }


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

  calcularPaginas (contador: string){

    let paginas = parseInt(contador) / 10;
    let cantidadPaginas = Math.ceil(paginas);

    this.items = Array(cantidadPaginas).fill(0).map((x,i)=>i);

  }

    //solo filtro 
    objDeFiltro:any = {
      modelo:false,
      tela:false,
      peso_promedio:false,
      taller:false,
      dibujo:false,
    }
  valueFilter:boolean = false;
  listaDeFiltros:boolean = false
  filtroInput:string[] = [];




  onKey(searchValue: any): void {  

    this.productosYbuscador(searchValue);
    

 /*      this.historialDeBusqueda = searchValue;
  
  
      this.inputConfiltros(this.filtroInput, searchValue); */
  
      
    }


  seleccionDeCheck(valor:any):void {

    this.objDeFiltro[valor.target.value] = !this.objDeFiltro[valor.target.value];


    if(valor.target.checked == true){
      this.filtroInput.push(valor.target.value);
    }else{
      this.filtroInput.splice(this.filtroInput.indexOf(valor.target.value), 1);
    }  
  }
  // solo filtro final

}
