import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ProduccionService } from 'src/app/produccion/servicios/produccion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-para-imprimir-taller',
  templateUrl: './para-imprimir-taller.component.html',
  styleUrls: ['./para-imprimir-taller.component.css']
})
export class ParaImprimirTallerComponent implements OnInit {



  arrayPrueba:any = [
    {
      id:2,
      cantidad: 30
    },
    {
      id:3,
      cantidad: 50
    },
    {
      id:4,
      cantidad: 100
    },
    {
      id:5,
      cantidad: 140
    }
  ];


  precioNuevo:any = [];

  arrayDePrecios:any = [];

  totalPrecios:number = 0;
  
  @Output()
  AbrirCerrarVentana: EventEmitter<any> = new EventEmitter();

  @Input()
  dataArray:any;

  @Input()
  dataInsertada:any;;

  constructor(public servicioProduccion:ProduccionService) { }

  ngOnInit(): void {



  }

  onChange(precio: any, cantidad:any, id:any){

    //obtener el id  por el id

    let seleccion:any = document.getElementById(`${id}`);


    if(this.precioNuevo.some((x:any) => x.id == id) === false){

      if(isNaN(parseInt(precio.value) * parseInt(cantidad))){

        seleccion.innerHTML = '$ 0';
        this.precioNuevo.map((x:any) => {
          if(x.id == id){
            x.total = 0;
            //x.precio = precio.value;
  
          }
        });
        this.funcionDeTotals()

      }else{
        

        this.precioNuevo.push({
          id: id,
          total: (parseInt(precio.value) * parseInt(cantidad)),
          //precio:precio.value
        })
        this.funcionDeTotals();

      }

  

      seleccion.innerHTML = '$ ' + (parseInt(precio.value) * parseInt(cantidad));

    }else{
      if(isNaN(parseInt(precio.value) * parseInt(cantidad))){
        seleccion.innerHTML = '$ 0';

        this.precioNuevo.map((x:any) => {
          if(x.id == id){
            x.total = 0;
      
            
  
          }
        })
        
        this.funcionDeTotals()


      }else{
       

        this.precioNuevo.map((x:any) => {
          if(x.id == id){
            x.total = (parseInt(precio.value) * parseInt(cantidad));
            x.precio = precio.value;
  
          }
        })
        this.funcionDeTotals()
        
        seleccion.innerHTML ='$ ' + (parseInt(precio.value) * parseInt(cantidad));
      }
    

    }



  }


  funcionDeTotals() {

    let total = 0;
    this.precioNuevo.map((x:any) => {
   
      total += x.total;
    }
    )
    this.totalPrecios = total;
    total = 0;
  
  }
  
  botonDeCarga:boolean = false;

  pdf(tag:string){
    this.botonDeCarga = true;

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
      this.botonDeCarga = false;
      docResult.save(`${new Date().toISOString()}.pdf`);
    });

  
  }


  botonDePagar:boolean = false;
  pagar(){
    this.botonDePagar = true;


    //console.log(this.precioNuevo)
    
    this.servicioProduccion.putPagarTaller(this.dataInsertada.taller.id, this.dataInsertada.de, this.dataInsertada.hasta, this.precioNuevo).subscribe(
      (res:any) => {

        if(res.ok == true){
          this.botonDePagar = false;
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '',
            showConfirmButton: false,
            timer: 1500
          })
        }else{
          this.botonDePagar = false;

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo salió mal!',

          })
        }

      }
      ), (error:any) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo salió mal!',

        })
      }
  }

}
