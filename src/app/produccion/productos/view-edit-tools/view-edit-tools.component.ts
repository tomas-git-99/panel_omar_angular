import { Component, OnInit } from '@angular/core';
import { faCheck, faCoffee, faTruck, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-view-edit-tools',
  templateUrl: './view-edit-tools.component.html',
  styleUrls: ['./view-edit-tools.component.css']
})
export class ViewEditToolsComponent implements OnInit {
  faTruck = faTruck;
  faExit = faXmark;
  faCheck = faCheck;
  constructor() { }

  ngOnInit(): void {
  }

}
