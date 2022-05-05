import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { format } from 'date-fns';
import { ProduccionService } from 'src/app/produccion/servicios/produccion.service';




@Component({
  selector: 'app-distribution',
  templateUrl: './distribution.component.html',
  styleUrls: ['./distribution.component.css']
})
export class DistributionComponent implements OnInit {
  dropDownList:any;


  isMenu: boolean = false;

  isSubTable: boolean = false;
  
  categoryChange:any[] = [
    'Camperas',
    'Remeras',
    'Pantalones',
  ] 
  valueHomeCategory:string = 'todo'

  filtroPorOpciones:boolean = false;

  filtroPorFechas:boolean = false;

  @ViewChild('categoryScrollX')categoryScrollX!:ElementRef<HTMLInputElement>;


  dataArrayProducto:any[] = [];

  viewTableSub:any[] = [];


  dataArraysSub:any = {}

  constructor(public servicioProduccion:ProduccionService ) { }

  ngOnInit(): void {
    this.servicioProduccion.getProductosDistribucion().subscribe(
      (res:any)=>{
        this.dataArrayProducto = res.data
        console.log(this.dataArrayProducto)

        res.data.forEach((element:any) => {

          this.dataArraysSub[element.id] = false;
 
         })

        
      }
    )

  }


  


  viewSubTable(id:string){
    this.dataArraysSub[id] ? this.dataArraysSub[id] = false : this.dataArraysSub[id] = true;
    
  }

  changeCategory(category: string){
    
    category === this.valueHomeCategory ? this.valueHomeCategory : this.valueHomeCategory = category;
  }


/*   moveCategory(value: string){

    console.log(value)

    value === 'right'
    ? this.categoryScrollX.nativeElement.scrollTo({ left: (this.categoryScrollX.nativeElement.scrollLeft + 150), behavior: 'smooth' })
    : this.categoryScrollX.nativeElement.scrollTo({ left: (this.categoryScrollX.nativeElement.scrollLeft - 150), behavior: 'smooth' })

  }
   */

  funcFiltroDeFechas(fecha_1:Date | any , fecha_2:Date | any){

    console.log(fecha_1, fecha_2)
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    console.log()
   
  }

  //paginacion
  estadoDePagina:number = 0;
  items:any = [];

  productosYbuscador(busqueda: string = '', pagina: string | number = 0 ){

/* 
    this.servicioProduccion.getDistribucion(busqueda, pagina).subscribe(
      (res) => {
        this.dataArrays = res.data;

       

        res.data.forEach((element:any) => {

         this.dataArraysSub[element.id] = false;

        })

        this.calcularPaginas(res.contador);


      }
    )
 */


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

  //paginacion end


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

}
