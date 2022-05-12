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
import { SubTableDistributionComponent } from './distribution/sub-table-distribution/sub-table-distribution.component';
import { SubTablesFailuresComponent } from './distribution/sub-table-distribution/sub-tables-failures/sub-tables-failures.component';
import { AddSalesComponent } from './distribution/sub-table-distribution/add-sales/add-sales.component';
import { AddFailuresComponent } from './distribution/sub-table-distribution/add-failures/add-failures.component';
import { RestoreFaultComponent } from './distribution/sub-table-distribution/restore-fault/restore-fault.component';
import { ModifyComponent } from './history/modify/modify.component';
import { CenterModifyHistoryComponent } from './history/modify/center-modify-history/center-modify-history.component';
import { SearchProductsComponent } from './history/modify/center-modify-history/search-products/search-products.component';
import { AddNoteComponent } from './history/modify/center-modify-history/add-note/add-note.component';
import { EditProductsMultipleComponent } from './history/modify/center-modify-history/edit-products-multiple/edit-products-multiple.component';
import { EditClientsComponent } from './history/modify/center-modify-history/edit-clients/edit-clients.component';
import { ModifyHomeComponent } from './home/center/modify-home/modify-home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { EditArticuloCartComponent } from './generate-voucher/shopping-cart/edit-articulo-cart/edit-articulo-cart.component';
import { ClienteExistenteComponent } from './generate-voucher/check-out/cliente-existente/cliente-existente.component';
import { SubTableModifyOrdenComponent } from './history/modify/sub-table-modify-orden/sub-table-modify-orden.component';
import { OpcionesComponent } from './opciones/opciones.component';
import { AgregarCategoriaComponent } from './opciones/agregar-categoria/agregar-categoria.component';
import { MigrarProductosComponent } from './opciones/migrar-productos/migrar-productos.component';
import { AgregarNuevoLocalComponent } from './opciones/agregar-nuevo-local/agregar-nuevo-local.component';
import { PaginacionComponent } from './paginacion/paginacion.component';
import { AgregarProductosComponent } from './opciones/agregar-productos/agregar-productos.component';
import { MoficadorDeProductosBetaComponent } from './generate-voucher/moficador-de-productos-beta/moficador-de-productos-beta.component';




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
    SubTableDistributionComponent,
    SubTablesFailuresComponent,
    AddSalesComponent,
    AddFailuresComponent,
    RestoreFaultComponent,
    ModifyComponent,
    CenterModifyHistoryComponent,
    SearchProductsComponent,
    AddNoteComponent,
    EditProductsMultipleComponent,
    EditClientsComponent,
    ModifyHomeComponent,
    EditArticuloCartComponent,
    ClienteExistenteComponent,
    SubTableModifyOrdenComponent,
    OpcionesComponent,
    AgregarCategoriaComponent,
    MigrarProductosComponent,
    AgregarNuevoLocalComponent,
    PaginacionComponent,
    AgregarProductosComponent,
    MoficadorDeProductosBetaComponent,
    
    
  ],
  imports: [
    CommonModule,
    VentasRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule

    
  ],
  exports: [
    VentasComponent,
  ]
})
export class VentasModule { }
