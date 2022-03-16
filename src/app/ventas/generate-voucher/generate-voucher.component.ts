import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generate-voucher',
  templateUrl: './generate-voucher.component.html',
  styleUrls: ['./generate-voucher.component.css']
})
export class GenerateVoucherComponent implements OnInit {
  dropDownList:any;
  constructor() { }

  ngOnInit(): void {
  }

}
