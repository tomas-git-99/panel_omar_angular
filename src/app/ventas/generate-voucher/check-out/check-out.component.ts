import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  volver(){
      
      this.router.navigate(['/generar']);
  
  }
}
