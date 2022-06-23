import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Orden } from 'src/app/ventas/inter/ordenHistorial';
import { VentasService } from 'src/app/ventas/servicios/ventas.service';


@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {


  arrayPrueba:any[] = [1,2,3,4]


  tallesPruebas:any[] = [4,6,8,10,14,16,18,20]


  dataDeOrden!:any;

  nuevoArrayConPro:any =[];

  constructor(public servicioVentas:VentasService, private router:Router) { }

  ngOnInit(): void { console.log(this.servicioVentas.mandarParaImprimir )


    if(this.servicioVentas.mandarParaImprimir != undefined){
      this.dataDeOrden = this.servicioVentas.mandarParaImprimir;
      this.arreglarOrden()
    }else{

      this.servicioVentas.getObtenerOrdenPorID(this.router.url.split('/')[2]).subscribe
      (
        res => {
          if (res.ok == true){
            if (res.data == null){
              this.router.navigate(['/ventas/historial']);
  
            }
            console.log(res);
            this.dataDeOrden = res.data;
            this.arreglarOrden()
          }else{
            this.router.navigate(['/ventas/historial']);
  
          }
    
        },(error) =>{
          this.router.navigate(['/ventas/historial']);
        }
      )
  
    }



  

    console.log(this.nuevoArrayConPro);
  }

  ngOnChanges(){

    console.log(this.servicioVentas.mandarParaImprimir )


    if(this.servicioVentas.mandarParaImprimir != undefined){
      this.dataDeOrden = this.servicioVentas.mandarParaImprimir;
      console.log('estoy con la data mandada')
    }else{

      console.log('use UN get')

      this.servicioVentas.getObtenerOrdenPorID(this.router.url.split('/')[2]).subscribe
      (
        res => {
          if (res.ok == true){
            if (res.data == null){
              this.router.navigate(['/ventas/historial']);
  
            }
            console.log(res);
            this.dataDeOrden = res.data;
            this.arreglarOrden()
          }else{
            this.router.navigate(['/ventas/historial']);
  
          }
    
        },(error) =>{
          this.router.navigate(['/ventas/historial']);
        }
      )
  
    }



  

    console.log(this.nuevoArrayConPro);
  }
  


  arreglarOrden(){
    this.dataDeOrden.orden_detalle.map((x:any) => {
      if (
        this.nuevoArrayConPro.some((t:any) => t.id == x.productoVentas.id) == false
      ) {
        //this.dataArraysSub[x.productoVentas.id] = false;
        this.nuevoArrayConPro.push({
          id: x.productoVentas.id,
          color:x.productoVentas.color == null ? '' : x.productoVentas.color,
          tela:x.productoVentas.sub_tela == null ? ( x.productoVentas.productoDetalles == null  ? '' : x.productoVentas.productoDetalles.producto.tela): x.productoVentas.sub_tela ,
          codigo: x.productoVentas.productoDetalles == null ?   x.productoVentas.id : x.productoVentas.productoDetalles.producto.codigo,
          local: x.productoVentas.productoDetalles == null ? '': x.productoVentas.productoDetalles.local.nombre,
          modelo:
            x.productoVentas.sub_modelo == null
              ? x.productoVentas.productoDetalles.producto.modelo
              : x.productoVentas.sub_modelo,

        dibujo: x.productoVentas.sub_dibujo == null 
        ? x.productoVentas.productoDetalles == null 
        ? '' : (x.productoVentas.productoDetalles.producto == null ? '' :x.productoVentas.productoDetalles.producto.estampado == null ? '' :x.productoVentas.productoDetalles.producto.estampado.dibujo )
        : x.productoVentas.sub_dibujo,

        precio: x.precio,
        talles:[
          {
            talle: x.talle,
            cantidad: x.cantidad,
       

          }
        ],
        });
      
        console.log(this.nuevoArrayConPro);
      } else {

        this.nuevoArrayConPro.find( (l:any) => l.id == x.productoVentas.id)
        .talles.push({
          talle: x.talle,
          cantidad: x.cantidad
        })
      }
    });
  }

  unirTallesCantidad(data:any[]){

    let tallesCantidad:string = '';

    let contador = 0;

    data.forEach(element => {

      tallesCantidad += `${ element+':' +(9)}` + (contador >= 2 ? ', ' : ',');

      contador >= 2 ? (contador = 0 ) : contador++;
      
    });


    return tallesCantidad

  }

  pdf(tag:string){
    const data:any = document.getElementById(`${tag}`);
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: 'A4',compress:true });
    //const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };

  

    html2canvas(data, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 1;
      const bufferY = 1;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}.pdf`);
    });

  
  }


  cantidad(array:any) {

    let cantidad:number = 0;

    array.forEach((element:any) => {
      cantidad += element.cantidad;
    })

    return cantidad;

  }

  cantidadTotalProducto(data:any) {
      
      let cantidad:number = 0;

      data.talles.forEach((element:any) => {
        cantidad += element.cantidad;
      })

      return data.precio * cantidad;
  }

  cantidadTotal() {
    let total:number = 0;
    this.nuevoArrayConPro.map((element:any) => {
      element.talles.forEach((x:any) => {
        total += element.precio * x.cantidad;

      })
    })

    return total;
  }

  cantidadTotalConDescuento(){
    let total:number = 0;
    this.nuevoArrayConPro.map((element:any) => {
      element.talles.forEach((x:any) => {
        total += element.precio * x.cantidad;

      })
    })


    this.dataDeOrden.descuento.map((x:any) => {
        total -= x.precio ;
    })
 

    return total;
  }


  tallesObtener(array:any){
    let talles:string = '';

    array.sort(function(a:any, b:any)  { return a.talle - b.talle});
    array.forEach((element:any, index:any) => {
      if(index === 0){
        talles += `${element.talle}`;
      }else{
        talles += ` -${element.talle}`;
      }


    })

    return talles;

  }


  salir(){
    this.router.navigate([`/ventas/historial`]);

  }

}
