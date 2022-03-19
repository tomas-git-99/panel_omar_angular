import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckOutComponent } from './ventas/generate-voucher/check-out/check-out.component';
import { InvoicesComponent } from './ventas/generate-voucher/check-out/invoices/invoices.component';
import { PayComponent } from './ventas/generate-voucher/check-out/pay/pay.component';
import { ShoppingCartComponent } from './ventas/generate-voucher/shopping-cart/shopping-cart.component';
import { VentasComponent } from './ventas/ventas.component';

const routes: Routes = [
  {
    path: 'ventas',
    loadChildren: () => import('./ventas/ventas.module').then(m => m.VentasModule)
  },
  {
    path: 'checkout',
    component: CheckOutComponent
  },
  {
    path: 'payment',
    component: PayComponent
  },
  {
    path: 'invoice',
    component: InvoicesComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
