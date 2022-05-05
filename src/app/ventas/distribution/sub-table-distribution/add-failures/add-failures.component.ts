import { Component, Input, OnInit } from '@angular/core';
import { VentasService } from 'src/app/ventas/servicios/ventas.service';

@Component({
  selector: 'app-add-failures',
  templateUrl: './add-failures.component.html',
  styleUrls: ['./add-failures.component.css']
})
export class AddFailuresComponent implements OnInit {

  @Input() dataArrayTalle: any = [];


  constructor(public servicioVentas:VentasService) { }

  ngOnInit(): void {
    console.log(this.dataArrayTalle);
  }

}
