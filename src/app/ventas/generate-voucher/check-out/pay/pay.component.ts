import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormaDePago } from 'src/app/ventas/inter/ventas';
import { VentasService } from 'src/app/ventas/servicios/ventas.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {
  isToggle:any;
  country: string = "United States";

  FormPagos!: FormGroup;

  descuentoTotal:number = 0;

  totalDeProducto:any ;

  arrayLocale:any

  cargaDeBoton:boolean = false;
  constructor(private router:Router, private _builder: FormBuilder,public servicioVentas:VentasService) { }

  ngOnInit(): void {

    this.totalDeProducto = localStorage.getItem('totalSoloProducto')
    JSON.parse(localStorage.getItem('descuentos') || '[]') === null 
    ? '' 
    : JSON.parse(localStorage.getItem('descuentos') || '[]').map((x:any) => this.descuentoTotal += parseInt(x.precio))  
    this.servicioVentas.getObtenerLocales().subscribe( res=>{
      console.log(res);
      this.arrayLocale = res.data;
    })

    this.FormPagos = this._builder.group({

      metodo_de_pago: ['', Validators.required],
      factura: ['', Validators.required],
      armado: ['', Validators.required],
      pagado: ['', Validators.required],
      transporte: ['', Validators.required],
      fecha_de_envio: ['', Validators.required],
    });
  }


  volver(){

    this.router.navigate(['/checkout']);

  }

  totalSUMA(descuentos:any, totalProductos:any ){

    return parseInt( totalProductos ) - parseInt( descuentos )  ;
  }

  enviarForm(value: FormaDePago){

    console.log(value);

    let id_usuario = localStorage.getItem('id_usuario');
    let {cliente} = JSON.parse(localStorage.getItem('cliente') || '[]');
    let notas = JSON.parse(localStorage.getItem('notas') || '[]');
    let descuentos = JSON.parse(localStorage.getItem('descuentos') || '[]');
    this.cargaDeBoton = true;
    this.servicioVentas.postGenerarOrden(id_usuario, {cliente:cliente, notas, descuentos, orden_estado:value})
    .subscribe( (res:any) => {
      console.log(res)
      if(res.ok === true) {

        this.router.navigate([`/invoice/${res.data.id}`]);
        this.cargaDeBoton = false;

      }else{
        this.cargaDeBoton = false;
      }

    })


   
    


 

    /* localStorage.setItem('orden_estado', JSON.stringify(value)); */
    
  }
}
