import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Orden } from 'src/app/ventas/inter/ordenHistorial';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit {



  @Input()
  arrayOrden!:Orden;

  @Output()
  cerrarVentana:EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }
  isOpenedList:any;
  openMenu(source:any) {
      this.isOpenedList = source;
  }
  closeMenu() {
      this.isOpenedList = -1;
  }



  addNote(note:string ,id_producto:number| string){


    console.log(note);
    console.log(id_producto);

  }

  addDescuento(motivo:string, precio:number |string){

    console.log(motivo);
    console.log(precio);
  }
}
