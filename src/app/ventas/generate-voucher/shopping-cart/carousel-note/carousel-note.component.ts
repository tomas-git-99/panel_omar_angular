import { Component, Input, OnInit } from '@angular/core';
import { VentasService } from 'src/app/ventas/servicios/ventas.service';

@Component({
  selector: 'app-carousel-note',
  templateUrl: './carousel-note.component.html',
  styleUrls: ['./carousel-note.component.css']
})
export class CarouselNoteComponent implements OnInit {


  @Input() notas: any;

  constructor(public servicioVentas: VentasService) { }

  ngOnInit(): void {
    console.log(
      this.notas
    )
  }


  eliminarNota(id: string) {

    console.log(id)
  
    let data = JSON.parse(localStorage.getItem('notas') || '[]');


    data.forEach((element:any,index:any)=>{
      if(element.id_producto == id) data.splice(index,1);
   });
    localStorage.setItem('notas', JSON.stringify(data));

    this.servicioVentas.actualizarLista$.emit(true)
  }

}
