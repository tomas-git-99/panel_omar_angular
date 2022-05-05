import { Component, OnInit } from '@angular/core';
import { VentasService } from '../../servicios/ventas.service';

@Component({
  selector: 'app-agregar-nuevo-local',
  templateUrl: './agregar-nuevo-local.component.html',
  styleUrls: ['./agregar-nuevo-local.component.css']
})
export class AgregarNuevoLocalComponent implements OnInit {

  constructor(public servicioVentas:VentasService) { }

  ngOnInit(): void {
  }

}
