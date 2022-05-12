import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faCartShopping, faChevronLeft, faChevronRight, faTrash, faWrench } from '@fortawesome/free-solid-svg-icons';
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



    this.productosYbuscador()
  }
  changeCategory(category: string | number){
    if(category == 0 || category == '0'){
      this.productosYbuscador();

    }else{
      this.categoriaGuardada = category;
      this.productosYbuscador('', '', '', category);
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
        console.log(data)
        this.arrayProductos = data.data;
        this.calcularPaginas(data.contador);

      }
    )

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

  filtrosOpciones:boolean = false
  filtrosFechas:boolean = false


  onKey(value:string){
    this.productosYbuscador( value, 0, '', this.categoriaGuardada,this.objDeFiltro.codigo, this.objDeFiltro.dibujo, this.objDeFiltro.color);
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
