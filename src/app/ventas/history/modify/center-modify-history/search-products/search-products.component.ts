import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.css']
})
export class SearchProductsComponent implements OnInit {
  isList:any;
    subList = 3;
  constructor() { }

  ngOnInit(): void {
  }

}
