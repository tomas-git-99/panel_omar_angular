import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';




@Component({
  selector: 'app-distribution',
  templateUrl: './distribution.component.html',
  styleUrls: ['./distribution.component.css']
})
export class DistributionComponent implements OnInit {
  dropDownList:any;


  isMenu: boolean = false;

  isSubTable: boolean = false;
  categoryChange:any[] = [
    'todo',
    'proceso',
    'entregados',
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
