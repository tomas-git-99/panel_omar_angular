import { Component, OnInit } from '@angular/core';
import { faBuilding, faPaintRoller, faPalette, faPerson, faScroll, faTShirt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {


  faShirt = faTShirt;
  faBuilding = faBuilding;
  faPalette = faPalette;
  faScroll = faScroll;
  faPaintRoller = faPaintRoller;
  faPerson = faPerson;
  constructor() { }

  ngOnInit(): void {
  }

}
