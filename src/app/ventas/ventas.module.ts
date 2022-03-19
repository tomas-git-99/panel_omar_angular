import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { DistributionComponent } from './distribution/distribution.component';
import { HistoryComponent } from './history/history.component';
import { GenerateVoucherComponent } from './generate-voucher/generate-voucher.component';
import { VentasComponent } from './ventas.component';
import { VentasRoutingModule } from './ventas-routing.module';
import { SubTableComponent } from './home/sub-table/sub-table.component';
import { QuickViewsComponent } from './generate-voucher/quick-views/quick-views.component';
import { ShoppingCartComponent } from './generate-voucher/shopping-cart/shopping-cart.component';
import { CartSubTableComponent } from './generate-voucher/cart-sub-table/cart-sub-table.component';
import { CarouselNoteComponent } from './generate-voucher/shopping-cart/carousel-note/carousel-note.component';
import { CenterOptionsComponent } from './generate-voucher/shopping-cart/center-options/center-options.component';
import { ChangePriceComponent } from './generate-voucher/shopping-cart/center-options/change-price/change-price.component';
import { NoteComponent } from './generate-voucher/shopping-cart/center-options/note/note.component';
import { OfferComponent } from './generate-voucher/shopping-cart/center-options/offer/offer.component';
import { CheckOutComponent } from './generate-voucher/check-out/check-out.component';
import { PayComponent } from './generate-voucher/check-out/pay/pay.component';
import { InvoicesComponent } from './generate-voucher/check-out/invoices/invoices.component';





@NgModule({
  declarations: [
    HomeComponent,
    DistributionComponent,
    HistoryComponent,
    GenerateVoucherComponent,
    VentasComponent,
    SubTableComponent,
    QuickViewsComponent,
    ShoppingCartComponent,
    CartSubTableComponent,
    CarouselNoteComponent,
    CenterOptionsComponent,
    ChangePriceComponent,
    NoteComponent,
    OfferComponent,
    CheckOutComponent,
    PayComponent,
    InvoicesComponent,
    
  ],
  imports: [
    CommonModule,
    VentasRoutingModule,


    
  ],
  exports: [
    VentasComponent,
  ]
})
export class VentasModule { }
