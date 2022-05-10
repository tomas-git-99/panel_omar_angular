import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faPercent } from '@fortawesome/free-solid-svg-icons';
import { CarritoElement } from '../../inter/carrito';
import { VentasService } from '../../servicios/ventas.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})

// install Swiper modules
export class ShoppingCartComponent implements OnInit {

  faPercent = faPercent;

  dropDownList: any;

  isMenu: boolean = false;

  isSubTable: boolean = false;
  categoryChange: any[] = ['todo', 'camisetas', 'buzos', 'camperas'];
  valueHomeCategory: string = 'todo';

  arrayCarritoProductos: any[] = [];

  dataArraysSub:any = {}


  totalCarrito:number[] = [];

  @ViewChild('categoryScrollX') categoryScrollX!: ElementRef<HTMLInputElement>;

  isOpenedList: any;

  descuentoTotal: number = 0;

  todasLasNotas: any;

  todosLosDescuento: any;


  arrayProducotData: any
  abrirCerrarVentanaEditarProducto:boolean = false;
  openMenu(source: any) {
    this.isOpenedList = source;
  }
  closeMenu() {
    this.isOpenedList = -1;
  }

  constructor(public servicioVentas: VentasService, private router: Router) {}

  ngOnInit(): void {
    this.servicioVentas
      .getObtenerCarrito(localStorage.getItem('id_usuario'))
      .subscribe((res) => {
        this.arreglarCarrito(res.data.carrito);
      });

      JSON.parse(localStorage.getItem('descuentos') || '[]') === null 
      ? '' 
      : JSON.parse(localStorage.getItem('descuentos') || '[]').map((x:any) => this.descuentoTotal += parseInt(x.precio))  
      this.todosLosDescuento = JSON.parse(localStorage.getItem('descuentos') || '[]')


      JSON.parse(localStorage.getItem('notas') || '[]') === null 
      ? '' 
      : this.todasLasNotas = JSON.parse(localStorage.getItem('notas') || '[]')
      
      this.servicioVentas.actualizarLista$.subscribe( () => {
        this.descuentoTotal = 0;
        JSON.parse(localStorage.getItem('descuentos') || '[]').map((x:any) => {
          this.descuentoTotal += parseInt(x.precio)
        })
        this.todosLosDescuento = JSON.parse(localStorage.getItem('descuentos') || '[]')

        this.todasLasNotas = JSON.parse(localStorage.getItem('notas') || '[]')
      })


  }

  eliminarDescuento(index: number | string) {
    let data = JSON.parse(localStorage.getItem('descuentos') || '[]')
    data.splice(index,1)
    localStorage.setItem('descuentos',JSON.stringify(data))
    this.servicioVentas.actualizarLista$.emit(true)
  }

  completarDatos(){
    localStorage.setItem('totalSoloProducto', this.sumaTotalCarrito().toString())
    this.router.navigate(['/checkout']);
  }

  arreglarCarrito(carrito: CarritoElement[]) {

    console.log(carrito)
    carrito.map((x) => {
      if (
        this.arrayCarritoProductos.some((t) => t.id == x.producto.id) == false
      ) {
        this.dataArraysSub[x.producto.id] = false;
        this.arrayCarritoProductos.push({
          id: x.producto.id,
          color:x.producto.color,
          codigo: ( x.producto.productoDetalles == null ? x.producto.id : x.producto.productoDetalles.producto.codigo),
          local: ( x.producto.productoDetalles == null ?   x.producto.sub_local :  x.producto.productoDetalles.local  ),
          modelo:
            x.producto.sub_modelo == null
              ? x.producto.productoDetalles.producto.modelo
              : x.producto.sub_modelo,

        dibujo: x.producto.sub_dibujo == null 
        ? (x.producto.productoDetalles.producto.estampado.length > 0 ? x.producto.productoDetalles.producto.estampado[0].dibujo : '')
        : x.producto.sub_dibujo,

        precio: x.precio_nuevo == null 
        ? x.producto.precio
        : x.precio_nuevo,
        talles:[
          {
            id:x.id,
            talle: x.talle,
            cantidad: x.cantidad,
       

          }
        ],
        });
      
        console.log(this.arrayCarritoProductos);
      } else {

        this.arrayCarritoProductos.find( l => l.id == x.producto.id)
        .talles.push({
          id:x.id,
          talle: x.talle,
          cantidad: x.cantidad
        })
      }
    });
  }

  sumaTotalCarrito(){

    let cantidadTotal = 0
    this.arrayCarritoProductos.map(x => {
      x.talles.map( (y:any) => {
        cantidadTotal += y.cantidad * x.precio
      })
    })

    this.servicioVentas.totalDeSoloProducto$.emit(cantidadTotal);

    return cantidadTotal
  }
  

  sumaDePrecioTotalDeUnProducto(producto:any[] ,precio:number) {

    let sumaTotal = 0;
    let totalDeProductos = 0;
    let talles: any[]= [];
 
    producto.map(x => {
      totalDeProductos += x.cantidad;
      talles.push(x.talle);
    }
    )

    sumaTotal = precio * totalDeProductos ;
    
    talles.sort(function(a, b) {
      return a - b;
    });

    this.totalCarrito.push(sumaTotal)


    return [talles,totalDeProductos,sumaTotal];
  }

  viewSubTable(id:string) {
    this.dataArraysSub[id] ? this.dataArraysSub[id] = false : this.dataArraysSub[id] = true;
  }

  changeCategory(category: string) {
    category === this.valueHomeCategory
      ? this.valueHomeCategory
      : (this.valueHomeCategory = category);
  }

  moveCategory(value: string) {
    console.log(value);

    value === 'right'
      ? this.categoryScrollX.nativeElement.scrollTo({
          left: this.categoryScrollX.nativeElement.scrollLeft + 150,
          behavior: 'smooth',
        })
      : this.categoryScrollX.nativeElement.scrollTo({
          left: this.categoryScrollX.nativeElement.scrollLeft - 150,
          behavior: 'smooth',
        });
  }

  changePrecio: boolean = false;
  addNote: boolean = false;
  descuento: boolean = false;

  viewModify(value: string) {
    value === 'changePrecio'
      ? (this.changePrecio = true)
      : value === 'addNote'
      ? (this.addNote = true)
      : value === 'descuento'
      ? (this.descuento = true)
      : null;
    this.isOpenedList = -1;
  }
}
