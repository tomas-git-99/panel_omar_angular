import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit {

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
}
