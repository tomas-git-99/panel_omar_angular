import { Component, OnInit } from '@angular/core';
import { VentasService } from '../../servicios/ventas.service';

@Component({
  selector: 'app-migrar-productos',
  templateUrl: './migrar-productos.component.html',
  styleUrls: ['./migrar-productos.component.css']
})
export class MigrarProductosComponent implements OnInit {

  constructor(public servicioVentas:VentasService) { }

  ngOnInit(): void {
  }

}
