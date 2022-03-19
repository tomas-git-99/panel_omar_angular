import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {
  isToggle:any;
  country: string = "United States";
  constructor() { }

  ngOnInit(): void {
  }

}
