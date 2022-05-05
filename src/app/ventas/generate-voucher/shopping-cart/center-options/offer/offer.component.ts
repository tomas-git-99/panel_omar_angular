import { Component, Input, OnInit } from '@angular/core';
import { VentasService } from 'src/app/ventas/servicios/ventas.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {

  constructor(public servicioVentas: VentasService) { }
  @Input() descuento: boolean = false;

  ngOnInit(): void {
  }
  isOpenedList:any;
  openMenu(source:any) {
      this.isOpenedList = source;
  }
  closeMenu() {
      this.isOpenedList = -1;
  }


  closeView() {
    
    this.descuento = !this.descuento;
  }

  agregarDescuento(precio:string| number, motivo:string){



    if(precio == '' ){

      return alert("Nota o Id no pueden estar vacios")
    }

    if(localStorage.getItem("descuentos") === null){

      localStorage.setItem('descuentos', JSON.stringify([{precio:precio, motivo:motivo}]));

      this.servicioVentas.actualizarLista$.emit(true);

    }else{

      
    
      let data = JSON.parse(localStorage.getItem('descuentos') || '[]');

      data.push({precio:precio, motivo:motivo});
      localStorage.setItem('descuentos', JSON.stringify(data));

      this.servicioVentas.actualizarLista$.emit(true);

    }

  }
  }



