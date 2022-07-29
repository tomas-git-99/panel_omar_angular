import { Component, OnInit } from '@angular/core';
import { VentasService } from '../servicios/ventas.service';

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.component.html',
  styleUrls: ['./opciones.component.css']
})
export class OpcionesComponent implements OnInit {


  abrirVentana:boolean = false;
  abrirVentanaCrearGrupo:boolean = false;

  constructor(public servicioVentas:VentasService) { }

  ngOnInit(): void {
  }

}
