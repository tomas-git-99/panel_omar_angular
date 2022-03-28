import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {
  isToggle:any;
  country: string = "United States";
  constructor(private router:Router) { }

  ngOnInit(): void {
  }


  volver(){

    this.router.navigate(['/checkout']);

  }
}
