import { Component, OnInit } from '@angular/core';
import { faBuilding, faPaintBrush, faPaintRoller, faPalette, faScroll, faTShirt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {


  faShirt = faTShirt;
  faBuilding = faBuilding;
  faPalette = faPalette;
  faScroll = faScroll;
  faPaintRoller = faPaintRoller;

  constructor() { }

  ngOnInit(): void {
  }

}
