import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modify-home',
  templateUrl: './modify-home.component.html',
  styleUrls: ['./modify-home.component.css']
})
export class ModifyHomeComponent implements OnInit {

  @Input() isModifySub: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }


  exitModify(){
    console.log(this.isModifySub)
    this.isModifySub = !this.isModifySub;
  }

}
