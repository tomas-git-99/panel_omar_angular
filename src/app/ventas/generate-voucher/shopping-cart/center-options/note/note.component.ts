import { Component, Input, OnInit } from '@angular/core';
import { VentasService } from 'src/app/ventas/servicios/ventas.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  constructor(public servicioVentas: VentasService) { }

  @Input() addNote: boolean = false;
  @Input() arrayCarritoProductosHijo: any

  
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
    
    this.addNote = !this.addNote;
  }

  agregarNota(id:string, nota:string){
    console.log(id, nota)

    if(id == '' || nota == ''){

      return alert("Nota o Id no pueden estar vacios")
    }

    if(localStorage.getItem("notas") === null){

      localStorage.setItem('notas', JSON.stringify([{id_producto:id.split(',')[0], codigo:id.split(',')[1], nota:nota}]));

      this.servicioVentas.actualizarLista$.emit(true);
    }else{

      
    
      let data = JSON.parse(localStorage.getItem('notas') || '[]');
      if(data.some( (x:any) => x.id_producto == id.split(',')[0])){

        return alert('El producto ya tiene una nota');
      }
      this.servicioVentas.actualizarLista$.emit(true);
      
      data.push({id_producto:id.split(',')[0], codigo:id.split(',')[1], nota:nota});
      localStorage.setItem('notas', JSON.stringify(data));
    }

  }
}
