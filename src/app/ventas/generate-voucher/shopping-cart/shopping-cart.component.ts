import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';





@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})





// install Swiper modules
export class ShoppingCartComponent implements OnInit {

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

  isOpenedList:any;
  openMenu(source:any) {
      this.isOpenedList = source;
  }
  closeMenu() {
      this.isOpenedList = -1;
  }

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


  changePrecio:boolean = false;
  addNote: boolean = false;
  descuento: boolean = false;


  viewModify(value: string){
    

    value === 'changePrecio'
    ? this.changePrecio = true
    : value === 'addNote'
    ? this.addNote = true
    : value === 'descuento'
    ? this.descuento = true
    : null;
    this.isOpenedList = -1;
  }

}
