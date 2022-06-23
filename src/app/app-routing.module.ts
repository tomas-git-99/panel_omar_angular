
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './seguridad/auth.guard';
import { AdminGuard } from './seguridad/auth/admin.guard';
import { TokenGuard } from './seguridad/auth/token/token.guard';
import { UsuarioComponent } from './usuario/usuario.component';
import { CheckOutComponent } from './ventas/generate-voucher/check-out/check-out.component';
import { InvoicesComponent } from './ventas/generate-voucher/check-out/invoices/invoices.component';
import { PayComponent } from './ventas/generate-voucher/check-out/pay/pay.component';
import { ShoppingCartComponent } from './ventas/generate-voucher/shopping-cart/shopping-cart.component';
import { TicketDetalleComponent } from './ventas/generate-voucher/ticket-detalle/ticket-detalle.component';
import { VentasComponent } from './ventas/ventas.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
   // canActivate: [AuthGuard]

  },{
    path: 'usuario',
    component: UsuarioComponent,
    canActivate: [AuthGuard]
  },
  {

    path: 'ventas',
    loadChildren: () => import('./ventas/ventas.module').then(m => m.VentasModule),
    canActivate: [ AuthGuard  ],

  },
  {
    path: 'produccion',
    loadChildren: () => import('./produccion/produccion.module').then(m => m.ProduccionModule),
    canActivate: [ AuthGuard ],

  },
  {
    path: 'checkout',
    component: CheckOutComponent,
    canActivate: [ AuthGuard ],

  },
  {
    path: 'payment',
    component: PayComponent,
    canActivate: [AuthGuard ],

  },
  {
    path: 'invoice/:id',
    component: InvoicesComponent,
    canActivate: [ AuthGuard ],

  },
  {
    path: 'ticket/:token',
    component: TicketDetalleComponent,
    canActivate: [TokenGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
