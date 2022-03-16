import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dropDownList:any;


  isMenu: boolean = false;

  isSubTable: boolean = false;
  categoryChange:any[] = [
    'todo',
    'camisetas',
    'buzos',
    'camperas'
  ] 
  valueHomeCategory:string = 'todo'

  @ViewChild('categoryScrollX')categoryScrollX!:ElementRef<HTMLInputElement>;



  constructor() { }

  ngOnInit(): void {
  }


  


  viewSubTable(){
    this.isSubTable = !this.isSubTable;
  }

  changeCategory(category: string){
    
    category === this.valueHomeCategory ? this.valueHomeCategory : this.valueHomeCategory = category;
  }


  moveCategory(value: string){

    console.log(value)

    value === 'right'
    ? this.categoryScrollX.nativeElement.scrollTo({ left: (this.categoryScrollX.nativeElement.scrollLeft + 150), behavior: 'smooth' })
    : this.categoryScrollX.nativeElement.scrollTo({ left: (this.categoryScrollX.nativeElement.scrollLeft - 150), behavior: 'smooth' })

  }

}
