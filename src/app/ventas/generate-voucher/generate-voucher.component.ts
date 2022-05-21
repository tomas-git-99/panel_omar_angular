import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { faCartShopping, faChevronLeft, faChevronRight, faTrash, faWrench } from '@fortawesome/free-solid-svg-icons';
import { Usuario } from 'src/app/interfaces/usuario';
import { ProduccionService } from 'src/app/produccion/servicios/produccion.service';
import Swal from 'sweetalert2';
import { ProductosVentas } from '../inter/ventas';
import { VentasService } from '../servicios/ventas.service';

@Component({
  selector: 'app-generate-voucher',
  templateUrl: './generate-voucher.component.html',
  styleUrls: ['./generate-voucher.component.css']
})
export class GenerateVoucherComponent implements OnInit {
  dropDownList:any;



  faWrech = faWrench
  faTrash = faTrash

  faCart = faCartShopping;
  faArrowLeft = faChevronLeft;
  faArrowRight = faChevronRight;

  arrayProductos!:any;

  categoryChange:any[] = [
    {
      id:0,
      nombre:'Todos'
    }
  ] 
  valueHomeCategory:any = 0;

  id_producto_Padre:number = 0;

  estadoDePagina:number = 0;

  categoriaGuardada:any = '';
  items:any = [];
  @ViewChild('categoryScrollX')categoryScrollX!:ElementRef<HTMLInputElement>;


  abriCerrarVentana:boolean = false;

  enviarProductoSeleccionado:any;

  localesArray:any;
  categoriaArrays:any


  @Input() cantidadPaginas:number = 0;


  dataUsuarioLocal!:Usuario;
  estasEnELLOcal:string = '';
  localActual:number = 0;

  boolEstadoUnLocalOTodos:boolean = false;
  

  constructor(public servicioVentas:VentasService, public servicioProduccion:ProduccionService) { }

  ngOnInit(): void {

    this.servicioVentas.getObtenerCategorias().subscribe(
      res => {
        this.categoriaArrays = res.data;
        res.data.map( (e:any) => {
          this.categoryChange.push({
            id: e.id,
            nombre: e.nombre

        })
        })
        console.log(this.categoryChange)
      }
    )
    this.servicioVentas.getObtenerLocales().subscribe(
      res => {
        this.localesArray = res.data;
      }
    )


    this.dataUsuarioLocal = JSON.parse(localStorage.getItem('dataUsuario') as any);

    if (this.dataUsuarioLocal.local !== null) {
    
      this.localActual = this.dataUsuarioLocal.local.id

      this.productosYbuscador('',0, this.localActual);

      this.estasEnELLOcal = this.dataUsuarioLocal.local.nombre;

    }else{

      this.boolEstadoUnLocalOTodos = true;
      this.productosYbuscador();
    }



  }

  seleccionDeLocal(id:any){

    if(id.target.value != ''){

      this.localActual = this.localesArray.find( (x:any) => x.id == id.target.value);
      this.productosYbuscador('',0, this.localActual);

    }else{
      this.valueGuardo = '';
      //this.localActual = 0;
      this.productosYbuscador();

    }



  }


  changeCategory(category: string | number){

    if(category == 0 || category == '0'){

      this.categoriaGuardada = '';
     
      if (this.localActual !== 0) {
      
        this.productosYbuscador('',0, this.localActual);
  
        //this.estasEnELLOcal = ;
  
      }else{
  
        this.estasEnELLOcal = 'Todos'
  
        this.productosYbuscador();
      }
  

    }else{
      this.categoriaGuardada = category;
      this.productosYbuscador('', 0, this.localActual, category);
    }
    category === this.valueHomeCategory ? this.valueHomeCategory : this.valueHomeCategory = category;
  }

  arrayTalles(arrays:any[]) {
    let arrayT:string[] = []

    arrays.map( 
      x => {
        arrayT.push(x.talles)
      }
    )
    return arrayT;
  }

  agregarCarrito(id:number){
    console.log(id)
    this.id_producto_Padre = id;
    this.servicioVentas.arrayDeProductoCarrito$.emit(this.arrayProductos.find( (x:any) => x.id === id)) 

    this.servicioVentas.abrirCerrarVentanaCarrito = !this.servicioVentas.abrirCerrarVentanaCarrito;

    

  }


  productosYbuscador(
    busqueda: string = '', 
    pagina: string | number = 0,
    local:any = '',
    categoria:any = '',
    codigo:any = '',
    dibujo:any = '',
    color:any = '',
    ){

    this.servicioVentas.getProductos(busqueda, pagina, local, categoria, codigo, dibujo, color).subscribe(
      (data:any)=>{
    
        this.arrayProductos = data.data;
        
        this.arrayProductos.map( (x:any )=> {
          x.talles_ventas.sort((a:any, b:any) => {
            return a.talles - b.talles;
          })
        })
       // this.calcularPaginas(data.contador);
        this.cantidadPaginas = data.contador

      }
    )

  }

  paginacion(pagina:any){



  this.productosYbuscador(this.valueGuardo, pagina, (this.localActual  == 0 ? '': this.localActual), this.categoriaGuardada);

  }

  cambioDePagina(paginaSiguiente:any) {

  
    this.estadoDePagina = parseInt(paginaSiguiente.target.attributes.id.nodeValue)


    //this.productosYbuscador( '', this.estadoDePagina + '0');

    if(this.localActual != 0){
      this.productosYbuscador( '', this.estadoDePagina + '0', this.localActual);

    }else{
      this.productosYbuscador( '', this.estadoDePagina + '0');

    }

 
  

  }


  cambioDePaginaNext(derechaIzquierda:boolean){

    console.log(derechaIzquierda)

    if(derechaIzquierda == true){
      if((this.items[this.items.length - 1]) > this.estadoDePagina ){
        if(this.localActual != 0){
          this.estadoDePagina +=  1;
          this.productosYbuscador('', this.estadoDePagina + '0', this.localActual);
          this.moveCategory('right', 20);
        }else{
          this.estadoDePagina +=  1;
          this.productosYbuscador('', this.estadoDePagina + '0');
          this.moveCategory('right', 20);
        }
      }
      


    }else{

      if(this.estadoDePagina > 0){
        if(this.localActual != 0){
          this.estadoDePagina -= 1;
          this.productosYbuscador('', this.estadoDePagina + '0', this.localActual);
          this.moveCategory('left', 20)
        }else{
          this.estadoDePagina -= 1;
          this.productosYbuscador('', this.estadoDePagina + '0');
          this.moveCategory('left', 20)
        }}
      


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

  filtrosOpciones:boolean = false
  filtrosFechas:boolean = false
  valueGuardo:string = ''

  onKey(value:string){
    this.valueGuardo = value;
    if (this.localActual !== 0) {
      //this.productosYbuscador('',0, this.id_local);
   
      this.productosYbuscador( value, 0, this.localActual, this.categoriaGuardada,this.objDeFiltro.codigo, this.objDeFiltro.dibujo, this.objDeFiltro.color);
  
      }else{
      //this.productosYbuscador('',0, this.id_local);
      this.productosYbuscador( value, 0, '', this.categoriaGuardada,this.objDeFiltro.codigo, this.objDeFiltro.dibujo, this.objDeFiltro.color);

      }
  }
  objDeFiltro:any = {
    modelo:'',
    color:'',
    dibujo:'',
  }
  filtroInput:string[] = [];


  seleccionDeCheck(valor:any):void {
    console.log(valor.target.value);

    this.objDeFiltro[valor.target.value] = !this.objDeFiltro[valor.target.value];


    if(valor.target.checked == true){
      this.filtroInput.push(valor.target.value);
    }else{
      this.filtroInput.splice(this.filtroInput.indexOf(valor.target.value), 1);
    }  
  }


  seleccionDeProductoModificar(id: number | string){

    this.enviarProductoSeleccionado = this.arrayProductos.find((producto:any) => producto.id === id);

    this.abriCerrarVentana = !this.abriCerrarVentana;
  }


  eliminarProducto(id: number | string){


    Swal.fire({
      title: 'esta seguro que quiere eliminar este producto?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'SI!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.servicioVentas.deleteProductoVenta(id).subscribe(
          (res:any)=>{

            if(res.ok == true){

              this.arrayProductos.map( (x:any) => {
                if(x.id == id){
                  this.arrayProductos.splice(this.arrayProductos.indexOf(x), 1);
                }
              })
              Swal.fire(
                'Eliminado!',
                '',
                'success'
              )
            }else{
              Swal.fire(
                'Error!',
                'No se pudo eliminar el producto',
                'error'
              )
            }
          
          }
        )
    
      }
    })

  }

}
