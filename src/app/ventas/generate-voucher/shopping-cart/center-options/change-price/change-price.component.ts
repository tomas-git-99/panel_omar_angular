import { Component, Input, OnInit } from '@angular/core';
import { VentasService } from 'src/app/ventas/servicios/ventas.service';

@Component({
  selector: 'app-change-price',
  templateUrl: './change-price.component.html',
  styleUrls: ['./change-price.component.css']
})
export class ChangePriceComponent implements OnInit {

  @Input() changePrecioSub: boolean = false;

  @Input() arrayCarritoProductosHijo:any

  constructor(public servicioVentas: VentasService) { }

  ngOnInit(): void {

    console.log(this.arrayCarritoProductosHijo)
 
  }
  isOpenedList:any;
  openMenu(source:any) {
      this.isOpenedList = source;
  }
  closeMenu() {
      this.isOpenedList = -1;
  }


  closeView() {
    
    this.changePrecioSub = !this.changePrecioSub;
  }

  cambiarPrecio(id_producto:number | string,precio:number | string){
    console.log(id_producto,precio)
  }

}
