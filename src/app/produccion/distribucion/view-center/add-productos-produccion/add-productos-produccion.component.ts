import { Component, OnInit } from '@angular/core';
import { faTruck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-productos-produccion',
  templateUrl: './add-productos-produccion.component.html',
  styleUrls: ['./add-productos-produccion.component.css']
})
export class AddProductosProduccionComponent implements OnInit {

  modal: boolean = false;
  modalBtn(){
    this.modal=!this.modal
  }
  constructor() { }
  faTruck = faTruck

  ngOnInit(): void {
  }
}
